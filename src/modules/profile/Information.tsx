import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, Dimensions, Text } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Icons } from '../../assets';
import Header from '../../components/Header';
import CommonTextField from '../../components/CommonTextField';
import CommonButton from '../../components/Button';
import Modal from 'react-native-modal';

import CommonText from '../../components/CommonText';
import { navigate } from '../../navigation/utils/navigationUtils';
import Avatar from '../../components/Avatar';

import ListBank from '../../components/ListBank';
import { showMessageError } from '../../utils';
import DateSelection from '../../components/DateSelection';
import { SelectLocation } from '../../components/SelectLocation';
import { isValidEmail, isValidPhone } from '../../utils/validation';
import { useGetInfo, useUpdateInfo } from '../../services/profile';
import { appStore } from '../../states/app';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProvinceDto {
  province_id: string;
  province_name: string;
  province_type: string;
}

interface DistrictDto {
  district_id: string;
  district_name: string;
}

interface WardDto {
  ward_id: string;
  ward_name: string;
}

const Infomation = () => {
  const setLoading = appStore(state => state.setLoading);
  const { triggerGetInfo, errorGetInfo } = useGetInfo();
  const { triggerUpdateInfo, errorUpdateInfo } = useUpdateInfo();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [bankAccountNumber, setBankAccountNumber] = useState<string>('');
  const [bankAccountName, setBankAccountName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [province, setProvince] = useState<ProvinceDto>();
  const [district, setDistrict] = useState<DistrictDto>();
  const [ward, setWard] = useState<WardDto>();

  const onChangeFullName = (value: string) => {
    setFullName(value);
  };
  const onChangePhone = (value: string) => {
    setPhone(value);
  };
  const onChangeAddress = (value: string) => {
    setAddress(value);
  };
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onChangeBankAccountNumber = (value: string) => {
    setBankAccountNumber(value);
  };
  const onChangeBankAccountName = (value: string) => {
    setBankAccountName(value);
  };

  const onBackdropPress = () => {
    setShowModal(false);
  };

  const onSave = async () => {
    let check: boolean = true;
    if (email?.trim() && !isValidEmail(email)) {
      setErrorEmail('Email không đúng định dạng');
      check = false;
    }
    if (check) {
      setErrorName('');
      setErrorEmail('');
      try {
        setLoading(true);
        const res = await triggerUpdateInfo({
          fullName: fullName,
          email: email,
          dateOfBirth: dateOfBirth,
          address: address,
          phone: phone,
        });
        console.log('🚀 ~ onSave ~ res:', res);
        setShowModal(true);
      } catch (error: Error | any) {
        setLoading(false);
        showMessageError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const getInfo = async () => {
      const res = await triggerGetInfo();
      setFullName(res.data.fullName);
      setPhone(res.data.phone);
      setEmail(res.data.email);
      setDateOfBirth(res.data.dateOfBirth);
      setAddress(res.data.address);
    };
    getInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="Thông tin cá nhân" /> */}
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Avatar />
          <CommonTextField label="Họ và tên" value={fullName || ''} onChangeText={onChangeFullName} textError={errorName !== '' ? errorName : undefined} />
          <CommonTextField label="Số điện thoại" value={phone || ''} onChangeText={onChangePhone} editable={false} />
          <CommonTextField label="Email" value={email || ''} onChangeText={onChangeEmail} textError={errorEmail !== '' ? errorEmail : undefined} />
          <View
            style={[
              {
                width: Dimensions.get('screen').width - 32,
              },
            ]}>
            <CommonText text="Ngày sinh" styles={{ marginBottom: 8 }} />
            <DateSelection
              defaultDate={dateOfBirth || ''}
              onDateChange={date => {
                setDateOfBirth(date);
              }}
            />
          </View>
          <CommonTextField label="Địa chỉ" value={address || ''} onChangeText={onChangeAddress} />
          {/* <View
            style={{
              width: Dimensions.get('screen').width - 32,
            }}>
            <SelectLocation
              //
              setDistrict={setDistrict}
              setProvince={setProvince}
              setWard={setWard}
              district={district}
              province={province}
              ward={ward}
              showLabel
            />
          </View> */}

          {/* <CommonTextField label="Số tài khoản" value={bankAccountNumber} onChangeText={onChangeBankAccountNumber} />
          <CommonTextField label="Tên chủ tài khoản" value={bankAccountName} onChangeText={onChangeBankAccountName} />
          <ListBank onSelectBankValue={value => setBankName(value)} bankName={bankName} /> */}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <CommonButton text="Câp nhật" onPress={onSave} />
      </View>
      {/* <Modal isVisible={showModal} style={styles.modal} onBackdropPress={onBackdropPress}>
        <View style={styles.contentModal}>
          <Icons.Success />
          <CommonText text="Cập nhật thông tin thành công" styles={styles.success} />
        </View>
      </Modal> */}
      <Modal isVisible={showModal} style={styles.modal} onBackdropPress={onBackdropPress}>
        <View style={styles.contentModal}>
          <Icons.Fail />
          <CommonText text="Cập nhật thông tin thất bại" styles={styles.success} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Infomation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  bottom: {
    marginBottom: 24,
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  contentModal: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 38,
    paddingBottom: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    fontWeight: '600',
    marginTop: 8,
    color: Colors.textPrimary,
  },
  shadow: {
    borderRadius: 8,
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  borderDanger: {
    borderColor: 'red',
  },
});
