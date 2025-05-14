import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, Image, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../../components/Header';
import { Images } from '../../assets/Images';
import { Fonts, Icons } from '../../assets';
import { authorize } from 'react-native-app-auth';
import { useLoginFacebook, useLoginGoogle, useSignUp } from '../../services/auth';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import { userStore } from '../../states/user';
import { appStore } from '../../states/app';
import { styles } from './authStyles';
import { navigationRef } from '../../navigation/utils/navigationUtils';
import { Colors } from '../../assets/Colors';
import { isValidPassword } from '../../utils/validation';
import { isValidVietnamesePhone } from '../../utils/validation';

const SignUp = () => {
  const { setLoading } = appStore(state => state);
  const { setToken, setUser } = userStore(state => state);
  const { triggerLoginGG } = useLoginGoogle();
  const { triggerLoginFB } = useLoginFacebook();
  const { triggerSignUp } = useSignUp();

  const [checked, setChecked] = useState(false);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const validForm = () => {
    if (name === '') {
      return false;
    }
    if (address === '') {
      return false;
    }
    if (!checked) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (validForm()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, phoneNumber, password, address, checked]);

  const config = {
    issuer: 'https://accounts.google.com',
    clientId: '133817269160-jn8i430sqtn8loa8mvfdt773h97i2tgg.apps.googleusercontent.com',
    redirectUrl: 'com.ximiapp:/oauth2redirect/google',
    scopes: ['openid', 'profile', 'email'],
  };
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await authorize(config);
      console.log('Access Token:', result);
      const res = await triggerLoginGG({ accessToken: result.idToken });
      setToken(res.data.accessToken);
      setUser(res.data.user);

      console.log('ID Token:', result.idToken);
    } catch (error) {
      console.error('Login error', error);
    } finally {
      setLoading(false);
    }
  };
  const loginWithFacebook = async () => {
    try {
      setLoading(true);
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        console.log('Đăng nhập bị hủy.');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          console.log('Access Token:', data.accessToken.toString());
          const res = await triggerLoginFB({ accessToken: data.accessToken.toString() });
          setToken(res.data.accessToken);
          setUser(res.data.user);
          const profile = await Profile.getCurrentProfile();
          if (profile) {
            console.log('Tên người dùng:', profile.name);
          }
        }
      }
    } catch (error) {
      console.log('Đăng nhập thất bại với lỗi: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!isValidVietnamesePhone(phoneNumber)) {
      setPhoneError('Số điện thoại không hợp lệ');
    } else {
      setPhoneError('');
    }
    if (!isValidPassword(password)) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
    } else {
      setPasswordError('');
    }
    if (isValidVietnamesePhone(phoneNumber) && isValidPassword(password))
      try {
        console.log('🚀 ~ handleSignUp ~ name:', name);
        setLoading(true);
        const res = await triggerSignUp({ fullName: name, password, address, phone: phoneNumber });
        navigationRef.navigate('Otp', { id: res.data.id, phoneNumber: phoneNumber });
      } catch (error) {
        console.log('🚀 ~ handleSignUp ~ error:', error);
      } finally {
        setLoading(false);
      }
  };
  useEffect(() => {
    if (!phoneNumber) {
      setPhoneError('');
    }
    if (!password) {
      setPasswordError('');
    }
  }, [phoneNumber, password]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header />

        {/* Main content */}
        <View style={styles.content}>
          <Text style={styles.title}>Lên xe cùng Ximi!</Text>
          <Text style={styles.subtitle}>Đăng nhập/Đăng ký tài khoản Ximi ngay bây giờ</Text>

          <View style={styles.logo}>
            <Image source={Images.LogoApp} />
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.inputLabel}>Họ và tên</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Họ và tên" value={name} onChangeText={setName} />
              <TouchableOpacity style={styles.deleteButton} onPress={() => setName('')}>
                {name && <Icons.DeleteCircle />}
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 4 }} />

            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Số điện thoại" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
              <TouchableOpacity style={styles.deleteButton} onPress={() => setPhoneNumber('')}>
                {phoneNumber && <Icons.DeleteCircle />}
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 8 }}>
              {phoneError && (
                <View style={styles.errorContainer}>
                  <Icons.Warning />
                  <Text style={styles.errorText}>{phoneError}</Text>
                </View>
              )}
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
            <Text style={styles.inputLabel}>Khu vực đăng ký</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Khu vực đăng ký" value={address} onChangeText={setAddress} />
              <TouchableOpacity style={styles.deleteButton} onPress={() => setAddress('')}>
                {address && <Icons.DeleteCircle />}
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 4 }} />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setChecked(!checked)}>{checked ? <Icons.CheckboxActive /> : <Icons.Checkbox />}</TouchableOpacity>
              <Text style={styles.checkboxText}>
                Đồng ý với <Text style={{ color: Colors.main }}>Điều khoản</Text> và <Text style={{ color: Colors.main }}>Chính sách</Text> của XIMI
              </Text>
            </View>

            <TouchableOpacity style={isValid ? styles.loginButton : styles.loginButtonDisabled} disabled={!isValid} onPress={handleSignUp}>
              <Text style={isValid ? styles.loginButtonText : styles.loginButtonTextDisabled}>Đăng ký</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Bạn đã có tài khoản Ximi? </Text>
              <TouchableOpacity onPress={() => navigationRef.navigate('Login')}>
                <Text style={styles.registerLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ justifyContent: 'flex-end', flex: 1, marginTop: 16 }}>
            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Hoặc</Text>
              <View style={styles.divider} />
            </View>

            {/* Social login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton} onPress={loginWithFacebook}>
                <Icons.Facebook />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle}>
                <Icons.Google />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignUp;
