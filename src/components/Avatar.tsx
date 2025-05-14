import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Platform, ActionSheetIOS, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import FastImage from 'react-native-fast-image';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Icons } from '../assets';

const styles = StyleSheet.create({
  containerAvatar: {},
  cameraIcon: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  fastImage: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
});

const Avatar = () => {
  const updateAvatar = async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode);
    } else if (response.assets && response.assets.length > 0) {
      const source = Platform.OS === 'ios' ? response.assets[0].uri : `file://${response.assets[0].uri}`;
    }
  };

  const takePhoto = async () => {
    try {
      let granted;
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
      }
      if (Platform.OS === 'ios' || granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera({ mediaType: 'photo' }, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            updateAvatar(response);
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const chooseFromLibrary = () => {
    launchImageLibrary({ mediaType: 'photo' }, updateAvatar);
  };

  const showActionSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Huỷ', 'Chụp ảnh', 'Chọn ảnh có sẵn'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            takePhoto();
          } else if (buttonIndex === 2) {
            chooseFromLibrary();
          }
        },
      );
    } else {
      // For Android and other platforms
      Alert.alert(
        'Đổi ảnh đại diện',
        '',
        [
          { text: 'Chụp ảnh', onPress: () => takePhoto() },
          { text: 'Chọn ảnh có sẵn', onPress: () => chooseFromLibrary() },
        ],
        { cancelable: true },
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={showActionSheet} style={styles.containerAvatar}>
        <Icons.DefaultAvatar style={styles.fastImage} />
        <View style={styles.cameraIcon}>
          <Icons.Camera />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;
