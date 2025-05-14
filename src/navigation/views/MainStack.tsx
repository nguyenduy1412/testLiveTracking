import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavigatorParamList } from '../typings';
import { userStore } from '../../states/user';
import { StatusBar } from 'react-native';
import { Colors } from '../../assets/Colors';
import BottomStack from './BottomStack';
import AuthStack from './AuthStack';
import React, { useEffect } from 'react';
import ProfileStack from './ProfileStack';
import Infomation from '../../modules/profile/Information';
import { useGetInfo } from '../../services/profile';
import SupportCenter from '../../modules/profile/SupportCenter';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const MainStack = () => {
  const setUser = userStore(state => state.setUser);
  const { triggerGetInfo } = useGetInfo();

  useEffect(() => {
    const getInfo = async () => {
      const res = await triggerGetInfo();
      console.log('🚀 ~ getInfo ~ res:--------------', res);
      setUser(res.data);
    };
    getInfo();
  }, [triggerGetInfo]);

  return (
    <>
      <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={Colors.transparent} />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomStack">
        <Stack.Screen name="BottomStack" component={BottomStack} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="Infomation" component={Infomation} />
        <Stack.Screen name="SupportCenter" component={SupportCenter} />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
