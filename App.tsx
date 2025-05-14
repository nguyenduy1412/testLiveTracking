import { Clipboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Fonts, Icons } from './src/assets';
import RootNavigation from './src/navigation/views/RootNavigation';
import { SWRConfig, SWRConfiguration } from 'swr';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Tracking from './src/modules/liveTracking/Tracking'; 
import './firebase-messaging'; // Import file xử lý background
type Props = {};

const configuration: SWRConfiguration = {
  shouldRetryOnError: false,
  dedupingInterval: 100,
  focusThrottleInterval: 500,
};

const App = (props: Props) => {
  const [token,setToken]= useState('')
  useEffect(() => {
    // Yêu cầu quyền Android (API 33+)
    const requestPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Quyền thông báo bị từ chối');
        }
      } else {
        // iOS sẽ tự động yêu cầu khi gọi messaging().requestPermission()
        await messaging().requestPermission();
      }
    };

    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      setToken(token)
      // gửi token này lên server để lưu vào database
    };

    requestPermission();
    getToken();

    // Nhận khi app đang foreground
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert(
    //     remoteMessage.notification?.title || 'Thông báo',
    //     remoteMessage.notification?.body || 'Bạn có tin nhắn mới.',
    //   );
    // });

    // return unsubscribe;
  }, []);
  const copyToClipboard = () => {
    Clipboard.setString(token);
    Alert.alert('Đã sao chép!', 'Token đã được sao chép vào clipboard.');
  };
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text>{token}</Text>
      </TouchableOpacity>
    </View>
  ) 
  // return (
  //   <SWRConfig value={configuration}>
  //     <RootNavigation />
  //   </SWRConfig>
  // );
};

export default App;
