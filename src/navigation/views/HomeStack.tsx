const Stack = createNativeStackNavigator<RootNavigatorParamList>();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { userStore } from '../../states/user';
import { RootNavigatorParamList } from '../typings';
import Notification from './Notification';
const HomePageStack = () => {
  const token = userStore(state => state.token);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Notification">
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default HomePageStack;
