import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { Fonts, Icons } from '../../assets';
import CommonText from '../../components/CommonText';
import { Colors } from '../../assets/Colors';
import Modal from 'react-native-modal';

const Notification = () => {
  const data = [1, 2, 3, 4, 5, 6];
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const renderEmpty = () => {
    return (
      <View style={styles.wrapperEmpty}>
        <Icons.NoticeEmpty />
        <CommonText text="Không có thông báo nào" styles={styles.emptyLabel} />
      </View>
    );
  };
  const onBackdropPress = () => {
    setShowModal(false);
    setShowModalDelete(false);
  };
  return (
    <View>
      <Header />
      {/* {renderEmpty()} */}
      {data.map((item, index) => (
        <View key={index}>
          <View style={styles.contentNotification}>
            <View style={{ width: '15%' }}>
              <Image source={require('../../assets/images/imgNotification.png')} />
            </View>

            <TouchableOpacity style={{ width: '76%' }}>
              <Text style={styles.textNotifi} numberOfLines={1} ellipsizeMode="tail">
                Đánh giá chuyến đi từ Thạch thất
              </Text>
              <CommonText text="10 tiếng trước" styles={styles.labelRecharge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDetail} onPress={() => setShowModal(true)}>
              <Icons.DotsThree />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Modal isVisible={showModal} style={styles.modal} onBackdropPress={onBackdropPress}>
        <View style={styles.contentModal}>
          <View style={[styles.itemModalHeader, { alignItems: 'center' }]}>
            <Icons.ImageNotification />
            <CommonText text="Đánh giá chuyến đi từ Thạch thất" styles={styles.labelModal} />
            <View style={styles.halfUnderline} />
          </View>

          <TouchableOpacity
            style={styles.itemModal}
            onPress={() => {
              setShowModal(false);
              setShowModalDelete(true);
            }}>
            <Icons.CancelModal />
            <Text style={styles.labelModalBottom}>Xóa thông báo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemCancel}
            onPress={() => {
              setShowModal(false);
            }}>
            <Icons.WarningModal />
            <Text style={styles.labelModalBottom}>Báo cáo thông báo</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={showModalDelete} style={styles.modalDelete} onBackdropPress={onBackdropPress}>
        <View style={styles.contentModalDelete}>
          <Icons.Success />
          <CommonText text="Xóa tin nhắn thành công" styles={styles.success} />
        </View>
      </Modal>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  wrapperEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyLabel: {
    textAlign: 'center',
    marginTop: 16,
  },
  labelRecharge: {
    marginTop: 6,
    fontSize: Fonts.fontSize[12],
  },
  contentNotification: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.gray,
  },
  textNotifi: {
    fontFamily: Fonts.fontFamily.LexendBold,
    fontSize: Fonts.fontSize[14],
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  modalDelete: {
    flex: 1,
    justifyContent: 'center',
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
    fontFamily: Fonts.fontFamily.LexendBold,
  },
  labelModalBottom: {
    color: Colors.textPrimary,
    fontSize: Fonts.fontSize[15],
    fontFamily: Fonts.fontFamily.LexendSemiBold,
  },
  itemModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderColor: Colors.border,
    gap: 10,
  },
  itemModalHeader: {
    paddingTop: 20,
    // borderBottomWidth: 1,
    // borderColor: Colors.border,
  },
  textLogout: {
    color: Colors.red,
    fontWeight: '600',
    fontSize: Fonts.fontSize[15],
  },
  itemCancel: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 10,
  },
  btnDetail: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  halfUnderline: {
    marginTop: 15,
    width: '40%',
    height: 1.5,
    backgroundColor: '#aaa',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  success: {
    fontWeight: '600',
    marginTop: 8,
    color: Colors.textPrimary,
  },
  contentModalDelete: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 38,
    paddingBottom: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
