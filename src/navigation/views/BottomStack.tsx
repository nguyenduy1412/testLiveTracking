import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import HomePageStack from './HomeStack';
import { Colors } from '../../assets/Colors';
import { Fonts, Icons } from '../../assets';
import CommonText from '../../components/CommonText';
import ProfileStack from './ProfileStack';
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 14,
    backgroundColor: Colors.white,
    height: Platform.OS === 'ios' ? 100 : 70,

    shadowColor: '#22313F',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    elevation: 20,
  },
  nameTab: {
    lineHeight: 18,
    fontSize: Fonts.fontSize[12],
    fontFamily: Fonts.fontFamily.LexendSemiBold,
    marginTop: 6,
  },
  itemStack: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  profileStack: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    position: 'relative',
    bottom: 30,
    backgroundColor: 'white',
    paddingTop: 20,
    borderRadius: 25,
  },
  text2Style: {
    fontSize: Fonts.fontSize[14],
    fontFamily: Fonts.fontFamily.LexendSemiBold,
  },
  typeSuccess: {
    borderLeftColor: 'green',
  },
  typeError: {
    borderLeftColor: Colors.red,
  },
});

const getColorIcon = (focused: boolean) => (focused ? Colors.main : '#868686');

const renderIconTabBar = (nameStack: string, focused: boolean) => {
  switch (nameStack) {
    case 'HomeStack':
      return focused ? <Icons.HomeTabActive /> : <Icons.HomeTab />;
    case 'ActivityStack':
      return focused ? <Icons.ActivityActive /> : <Icons.Activity />;
    case 'ProfileStack':
      return focused ? <Icons.User /> : <Icons.User />;
    case 'ChatStack':
      return focused ? <Icons.CommentActive /> : <Icons.Comment />;
    case 'WalletStack':
      return focused ? <Icons.WalletActive /> : <Icons.Wallet />;
    default:
      return null;
  }
};

const renderNameTabBar = (nameStack: string, focused: boolean) => {
  switch (nameStack) {
    case 'HomeStack':
      return <CommonText text="Trang chủ" styles={{ ...styles.nameTab, color: getColorIcon(focused) }} />;
    case 'ActivityStack':
      return <CommonText text="Hoạt động" styles={{ ...styles.nameTab, color: getColorIcon(focused) }} />;
    case 'ProfileStack':
      return <CommonText text="Cá nhân" styles={{ ...styles.nameTab, color: getColorIcon(focused) }} />;
    case 'ChatStack':
      return <CommonText text="Tin nhắn" styles={{ ...styles.nameTab, color: getColorIcon(focused) }} />;
    case 'WalletStack':
      return <CommonText text="Thanh toán" styles={{ ...styles.nameTab, color: getColorIcon(focused) }} />;
    default:
      return null;
  }
};

const renderTabBar = (props: BottomTabBarProps) => {
  const {
    state: { routes, index, routeNames },
    navigation,
  } = props;
  return (
    <View style={styles.tabBar}>
      {routes?.map((stack, indexStack) => {
        const onPressStack = () => {
          if (indexStack === index) {
            return;
          }
          navigation.navigate(routeNames[indexStack]);
        };
        return (
          <TouchableOpacity key={indexStack} style={stack?.name === 'ProfileStack' ? styles.profileStack : styles.itemStack} onPress={onPressStack}>
            {renderIconTabBar(stack?.name, indexStack === index)}
            {renderNameTabBar(stack?.name, indexStack === index)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomStack = () => {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{ lazy: false }}>
      <Tab.Screen name="HomeStack" component={HomePageStack} options={{ headerShown: false }} />
      
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomStack;
