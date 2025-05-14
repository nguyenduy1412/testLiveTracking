import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import { styles } from './authStyles';
import { Icons } from '../../assets/icons';
import { navigationRef } from '../../navigation/utils/navigationUtils';
import { useForgotPassword } from '../../services/auth';
import { appStore } from '../../states/app';
import { isValidVietnamesePhone } from '../../utils/validation';

type Props = {};

const ForgotPassword = (props: Props) => {
  const { setLoading } = appStore(state => state);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { triggerForgotPassword } = useForgotPassword();
  const [error, setError] = useState('');

  const validForm = () => {
    if (phoneNumber === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    validForm();
  }, [phoneNumber]);
  const handleForgotPassword = async () => {
    if (!isValidVietnamesePhone(phoneNumber)) {
      setPhoneError('Số điện thoại không hợp lệ');
    } else {
      setPhoneError('');
    }
    if (isValidVietnamesePhone(phoneNumber))
      try {
        setLoading(true);
        const res = await triggerForgotPassword({ phone: phoneNumber });
        if (res.type === 'success') {
          setLoading(false);
          navigationRef.navigate('Otp', { id: res.data, phoneNumber: phoneNumber, type: 'forgot' });
        } else {
          setLoading(false);
        }
      } catch (error: Error | any) {
        console.log('🚀 ~ handleForgotPassword ~ error:', error.data.message);
        switch (error.data.message) {
          case 'user_not_found':
            setError('Số điện thoại không tồn tại');
            break;
          case 'otp_already_sent':
            setError('Mã OTP đã được gửi');
          case 'otp_limit_exceeded':
            setError('Mã OTP đã vượt quá số lần gửi');
            break;
          default:
            setError('Mã OTP không chính xác');
            break;
        }
        setLoading(false);
      } finally {
        setLoading(false);
      }
  };
  useEffect(() => {
    if (!phoneNumber) {
      setPhoneError('');
      setError('');
    }
  }, [phoneNumber]);
  return (
    <View style={styles.container}>
      <Header />
      <Logo />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleBold}>Quên mật khẩu</Text>
        </View>
        <Text style={styles.inputLabel}>Số điện thoại</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Số điện thoại" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
          <TouchableOpacity style={styles.deleteButton} onPress={() => setPhoneNumber('')}>
            {phoneNumber && <Icons.DeleteCircle />}
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 4 }}>
          {phoneError && (
            <View style={styles.errorContainer}>
              <Icons.Warning />
              <Text style={styles.errorText}>{phoneError}</Text>
            </View>
          )}
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Icons.Warning />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={{ marginHorizontal: '30%' }}>
          <TouchableOpacity style={isValid ? styles.loginButton : styles.loginButtonDisabled} disabled={!isValid} onPress={handleForgotPassword}>
            <Text style={isValid ? styles.loginButtonText : styles.loginButtonTextDisabled}>Gửi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản Ximi? </Text>
          <TouchableOpacity onPress={() => navigationRef.navigate('SignUp')}>
            <Text style={styles.registerLink}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
