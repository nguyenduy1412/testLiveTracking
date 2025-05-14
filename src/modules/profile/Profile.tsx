import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Fonts, Icons } from '../../assets';
import Avatar from '../../components/Avatar';
import CommonText from '../../components/CommonText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { navigate } from '../../navigation/utils/navigationUtils';
import { userStore } from '../../states/user';

const Profile = () => {
  const user = userStore(state => state.user);
  const { top } = useSafeAreaInsets();
  const [showModal, setShowModal] = useState<boolean>(false);
  const actionsInfo = [
    {
      icon: <Icons.PersonWallet />,
      title: 'Thanh toán',
      onPress: () => navigate('WalletStack', { screen: 'Wallet' }),
    },
    {
      icon: <Icons.PersonInfo />,
      title: 'Thông tin cá nhân',
      onPress: () => navigate('Infomation'),
    },
    {
      icon: <Icons.PersonLink />,
      title: 'Giới thiệu & nhận ưu đãi',
      //   onPress: () => navigate('Referral'),
    },
  ];
  const actionsSupport = [
    {
      icon: <Icons.PersonSupport />,
      title: 'Trung tâm hỗ trợ',
      onPress: () => navigate('SupportCenter'),
    },
    {
      icon: <Icons.Privacy />,
      title: 'Điều khoản và chính sách',
      //   onPress: () => navigate('Privacy'),
    },
    {
      icon: <Icons.PersonPhone />,
      title: 'Hỗ trợ khách hàng',
      right: '1900252262',
      onPress: () => Linking.openURL('tel:1900252262'),
    },
  ];
  const onBackdropPress = () => {
    setShowModal(false);
  };
  const renderActions = (items: Array<any>) => (
    <View>
      {items.map((item, index) => (
        <TouchableOpacity key={`${index}`} style={styles.itemMenu} onPress={item.onPress}>
          <View style={styles.itemLeft}>
            {item?.icon}
            <CommonText text={item.title} styles={styles.textMenu} />
          </View>
          <TouchableOpacity>
            <CommonText text={item?.right} styles={styles.textDetail} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
  const actionsAccount = [
    {
      icon: <Icons.PersonKey />,
      title: 'Đổi mật khẩu',
      // onPress: () => navigate('ChangePassword')
    },
    {
      icon: <Icons.PersonSetting />,
      title: 'Cài đặt',
      //   onPress: () => navigate('AccountSetting'),
    },
    {
      icon: <Icons.PersonLogout />,
      title: 'Đăng xuất',
      onPress: () => setShowModal(true),
    },
  ];
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.wrapper, marginTop: top }}>
        <View style={styles.top}>
          <Avatar />
          <CommonText text={user?.fullName || 'name'} styles={styles.name} />
        </View>

        <View style={styles.section}>
          <CommonText text="Thông tin" styles={styles.label} />
          <View style={styles.sectionBox}>{renderActions(actionsInfo)}</View>
        </View>

        <View style={styles.section}>
          <CommonText text="Hỗ trợ & sử dụng" styles={styles.label} />
          <View style={styles.sectionBox}>{renderActions(actionsSupport)}</View>
        </View>

        <View style={styles.section}>
          <CommonText text="Tài khoản" styles={styles.label} />
          <View style={styles.sectionBox}>{renderActions(actionsAccount)}</View>
        </View>
      </View>

      <Modal isVisible={showModal} style={styles.modal} onBackdropPress={onBackdropPress}>
        <View style={styles.contentModal}>
          <View style={styles.itemModal}>
            <CommonText text="Bạn có chắc chắn muốn đăng xuất ?" styles={styles.labelModal} />
          </View>
          <TouchableOpacity style={styles.itemModal}>
            <CommonText text="Đăng xuất" styles={styles.textLogout} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemCancel} onPress={() => setShowModal(false)}>
            <CommonText text="Huỷ" styles={styles.labelModal} />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    alignItems: 'center',
    marginTop: 40,
  },
  name: {
    marginTop: 6,
    fontSize: Fonts.fontSize[18],
    fontWeight: 'bold',
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  label: {
    marginTop: 10,
    fontSize: Fonts.fontSize[14],
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  textMenu: {
    fontSize: Fonts.fontSize[15],
    color: Colors.textPrimary,
    fontWeight: '500',
    marginLeft: 12,
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDetail: {
    color: Colors.main,
    fontWeight: '700',
    marginLeft: 24,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  contentModal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 40,
    alignContent: 'center',
  },
  labelModal: {
    marginTop: 8,
    color: Colors.textPrimary,
    fontSize: Fonts.fontSize[15],
  },
  itemModal: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  textLogout: {
    color: Colors.red,
    fontWeight: '600',
    fontSize: Fonts.fontSize[15],
  },
  itemCancel: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 30,
  },
  connectGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  connectBtn: {
    marginLeft: 10,
  },

  containerWarning: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 16,
    borderRadius: 12,
  },
  labelWarning: {
    color: Colors.textPrimary,
    fontSize: Fonts.fontSize[13],
  },
});
