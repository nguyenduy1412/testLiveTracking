import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import { styles } from './authStyles';
import { Icons } from '../../assets/icons';
import { navigationRef } from '../../navigation/utils/navigationUtils';
import { useForgotPassword, useResetPassword } from '../../services/auth';
import { appStore } from '../../states/app';
import { isValidPassword, isValidVietnamesePhone } from '../../utils/validation';
import { RouteProp } from '@react-navigation/native';
import { RootNavigatorParamList } from '../../navigation/typings';
import SuccessModal from '../../components/SuccessModal';
import FailureModal from '../../components/FailureModal';

type Props = {
  route: RouteProp<RootNavigatorParamList, 'ChangePassword'>;
};

const ChangePassword = (props: Props) => {
  const { setLoading } = appStore(state => state);
  const { phone } = props.route.params || {};
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const { triggerResetPassword } = useResetPassword();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const validForm = () => {
    if (password && confirmPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  useEffect(() => {
    validForm();
  }, [password, confirmPassword]);
  const handleForgotPassword = async () => {
    console.log('password', password);
    console.log('confirmPassword', confirmPassword);
    if (!isValidPassword(password)) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp');
    } else {
      setConfirmPasswordError('');
      try {
        setLoading(true);
        const res = await triggerResetPassword({
          phone: phone,
          password: password,
        });
        console.log('res--------', res.type);
        if (res.type === 'success') {
          setShowSuccessModal(true);
        }
      } catch (error) {
        setShowFailureModal(true);
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (!password) {
      setPasswordError('');
    }
  }, [password]);
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Logo />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleBold}>Đổi mật khẩu</Text>
        </View>
        <Text style={styles.inputLabel}>Mật khẩu</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry={secureTextEntry} />
          <TouchableOpacity style={styles.deleteButton} onPress={() => setSecureTextEntry(!secureTextEntry)}>
            {password && (secureTextEntry ? <Icons.Eyes /> : <Icons.EyeSlash />)}
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 8 }}>
          {passwordError && (
            <View style={styles.errorContainer}>
              <Icons.Warning />
              <Text style={styles.errorText}>{passwordError}</Text>
            </View>
          )}
        </View>
        <Text style={styles.inputLabel}>Nhập lại mật khẩu</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Mật khẩu" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={secureTextEntryConfirm} />
          <TouchableOpacity style={styles.deleteButton} onPress={() => setSecureTextEntryConfirm(!secureTextEntryConfirm)}>
            {confirmPassword && (secureTextEntryConfirm ? <Icons.Eyes /> : <Icons.EyeSlash />)}
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 8 }}>
          {confirmPasswordError && (
            <View style={styles.errorContainer}>
              <Icons.Warning />
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            </View>
          )}
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Icons.Warning />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={{ marginHorizontal: '20%', marginTop: 20 }}>
          <TouchableOpacity style={isValid ? styles.loginButton : styles.loginButtonDisabled} disabled={!isValid} onPress={handleForgotPassword}>
            <Text style={isValid ? styles.loginButtonText : styles.loginButtonTextDisabled}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
        <SuccessModal message="Đổi mật khẩu thành công" visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} onContinue={() => navigationRef.navigate('Login')} />
        <FailureModal message="Đổi mật khẩu thất bại" visible={showFailureModal} onClose={() => setShowFailureModal(false)} onContinue={() => setShowFailureModal(false)} />
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
