import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { NativeModules, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthStack from './AuthStack';
import { Fonts } from '../../assets';
import { Colors } from '../../assets/Colors';
import { navigationRef } from '../utils/navigationUtils';
import { userStore } from '../../states/user';
import MainStack from './MainStack';
import { appStore } from '../../states/app';
import Loading from '../../components/Loading';

const styles = StyleSheet.create({
  text2Style: {
    fontSize: Fonts.fontSize[14],
    fontFamily: Fonts.fontFamily.LexendBold,
  },
  typeSuccess: {
    borderLeftColor: 'green',
  },
  typeError: {
    borderLeftColor: Colors.red,
  },
  typeInfo: {
    borderLeftColor: 'yellow',
  },
});

// const customToast: ToastConfig = {
//   success: props => <BaseToast text2NumberOfLines={10} {...props} style={styles.typeSuccess} text2Style={styles.text2Style} />,
//   error: props => <BaseToast text2NumberOfLines={10} {...props} style={styles.typeError} text2Style={styles.text2Style} />,
//   info: props => <BaseToast text2NumberOfLines={10} {...props} style={styles.typeInfo} text2Style={styles.text2Style} />,
// };

const RootNavigation = () => {
  const isLogin = userStore(state => state.token);
  const isLoading = appStore(state => state.loading);

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          {/* {isLogin ? <MainStack /> : <AuthStack />} */}
          <AuthStack />
          {isLoading && <Loading />}
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default RootNavigation;
