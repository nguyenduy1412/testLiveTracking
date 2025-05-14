import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, Image, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../../components/Header';
import { Images } from '../../assets/Images';
import { Fonts, Icons } from '../../assets';
import { authorize } from 'react-native-app-auth';
import { useLoginFacebook, useLoginGoogle, useLoginPhone } from '../../services/auth';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import { Colors } from '../../assets/Colors';
import { userStore } from '../../states/user';
import { appStore } from '../../states/app';
import { styles } from './authStyles';
import { navigationRef } from '../../navigation/utils/navigationUtils';
import { isValidPassword, isValidVietnamesePhone } from '../../utils/validation';
import { useGetInfo } from '../../services/profile';

const Login = () => {
  const { setLoading } = appStore(state => state);
  const { setToken, setUser } = userStore(state => state);
  const { triggerLoginGG } = useLoginGoogle();
  const { triggerLoginFB } = useLoginFacebook();
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { triggerLoginPhone } = useLoginPhone();
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const validForm = () => {
    if (phoneNumber === '' || password === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    validForm();
  }, [phoneNumber, password]);
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
      Alert.alert('hiii');

      console.log('ID Token:', result.idToken);
    } catch (error) {
      setError('Đăng nhập thất bại');
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
      setError('Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };
  const handleLoginPhone = async () => {
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
        setLoading(true);
        const res = await triggerLoginPhone({ phone: phoneNumber, password });
        setToken(res.data.accessToken);
        // setUser(res.data.user);
      } catch (error: Error | any) {
        switch (error.data.message) {
          case 'phone_or_password_wrong':
            setError('Sai số điện thoại hoặc mật khẩu');
            break;
          default:
            setError('Đăng nhập thất bại');
        }
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
    setError('');
  }, [phoneNumber, password]);
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, { flex: 1 }]}>
            <Header />
            {/* Main content */}
            <View style={[styles.content, { flex: 1 }]}>
              <Text style={styles.title}>Lên xe cùng Ximi!</Text>
              <Text style={styles.subtitle}>Đăng nhập/Đăng ký tài khoản Ximi ngay bây giờ</Text>

              <View style={styles.logo}>
                <Image source={Images.LogoApp} />
              </View>

              {/* Form */}
              <View style={styles.form}>
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

                <TouchableOpacity style={styles.forgotPassword} onPress={() => navigationRef.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                {error && (
                  <View style={styles.errorContainer}>
                    <Icons.Warning />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                <TouchableOpacity style={isValid ? styles.loginButton : styles.loginButtonDisabled} disabled={!isValid} onPress={handleLoginPhone}>
                  <Text style={isValid ? styles.loginButtonText : styles.loginButtonTextDisabled}>Đăng nhập</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Bạn chưa có tài khoản Ximi? </Text>
                  <TouchableOpacity onPress={() => navigationRef.navigate('SignUp')}>
                    <Text style={styles.registerLink}>Đăng ký</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ justifyContent: 'flex-end', flex: 1 }}>
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
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Login;
