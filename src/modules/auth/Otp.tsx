import { RouteProp } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Keyboard, Alert } from 'react-native';
import { RootNavigatorParamList } from '../../navigation/typings';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import { Fonts } from '../../assets';
import { Colors } from '../../assets/Colors';
import { useOtp, useOtpVerify } from '../../services/auth';
import { appStore } from '../../states/app';
import { navigationRef } from '../../navigation/utils/navigationUtils';
import SuccessModal from '../../components/SuccessModal';
import FailureModal from '../../components/FailureModal';
import { useUpdateInfo } from '../../services/profile';
interface VerificationScreenProps {
  navigation: any;
  route: RouteProp<RootNavigatorParamList, 'Otp'>;
}

const Otp: React.FC<VerificationScreenProps> = ({ navigation, route }) => {
  const { phoneNumber } = route.params || {};
  const { id } = route.params || {};
  const { type } = route.params || {};
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState<number>(60);
  const inputRefs = useRef<Array<TextInput | null>>(Array(6).fill(null));
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailureModal, setShowFailureModal] = useState<boolean>(false);
  const { triggerOtp } = useOtp();
  const { setLoading } = appStore();
  const { triggerOtpVerify } = useOtpVerify();
  const [message, setMessage] = useState<string>('');
  const { triggerUpdateInfo } = useUpdateInfo();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      const pastedCode = text.slice(0, 6).split('');
      const newCode = [...code];

      pastedCode.forEach((digit, idx) => {
        if (idx + index < 6) {
          newCode[idx + index] = digit;
        }
      });

      setCode(newCode);

      const lastFilledIndex = newCode.findIndex(val => val === '') - 1;
      const targetIndex = lastFilledIndex >= 0 ? lastFilledIndex : 5;
      inputRefs.current[targetIndex]?.focus();
    } else {
      // Handle single digit input
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Auto-focus next input if current input is filled
      if (text !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      if (type === 'update') {
        try {
          setLoading(true);
          const res = await triggerUpdateInfo({ otp: verificationCode, phone: phoneNumber });
          setLoading(false);
          setShowSuccessModal(true);
        } catch (error: Error | any) {
          setMessage(error.data.message);
          setShowFailureModal(true);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const res = await triggerOtpVerify({ id, otp: verificationCode });
          setLoading(false);
          if (type === 'forgot') {
            navigationRef.navigate('ChangePassword', { phone: phoneNumber });
          } else {
            setShowSuccessModal(true);
          }
        } catch (error: any) {
          setMessage(error.data.message);
          setShowFailureModal(true);
        } finally {
          setLoading(false);
        }
      }
    } else {
      Alert.alert('Error', 'Please enter the complete verification code');
    }
  };
  const handleContinue = () => {
    setShowSuccessModal(false);
    if (type === 'update') {
      navigationRef.navigate('HomeStack', { screen: 'Home' });
    } else {
      navigationRef.navigate('Login');
    }
  };
  const handleOtp = async () => {
    try {
      setLoading(true);
      const res = await triggerOtp({ id });
      setLoading(false);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  const handleResendCode = () => {
    handleOtp();
    setTimer(60);
    setCode(Array(6).fill(''));
    inputRefs.current[0]?.focus();
  };

  useEffect(() => {
    if (type !== 'forgot') handleOtp();
  }, []);
  useEffect(() => {
    console.log('message-------------', message);
    switch (message) {
      case 'otp_already_sent':
        setMessage('Mã OTP đã được gửi');
        break;
      case 'otp_expired':
        setMessage('Mã OTP đã hết hạn');
        break;
      case 'otp_invalid':
        setMessage('Mã OTP không chính xác');
        break;
      case 'otp_limit_exceeded':
        setMessage('Mã OTP đã vượt quá số lần gửi');
        break;
      default:
        setMessage('Mã OTP không chính xác');
        break;
    }
  }, [message]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with back button */}
      <Header />

      {/* Logo */}
      <Logo />

      {/* Title and instructions */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mã xác thực</Text>
        <Text style={styles.subtitle}>
          Kiểm tra tin nhắn thông báo trên SMS{'\n'}
          <Text style={{ color: Colors.main, fontFamily: Fonts.fontFamily.LexendBold }}>số điện thoại: </Text>
          <Text style={styles.phoneNumber}>{phoneNumber.slice(0, -3).replace(/\d/g, '*') + phoneNumber.slice(-3)}</Text>
        </Text>
      </View>

      {/* Verification code inputs */}
      <View style={styles.codeContainer}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <TextInput
              key={index}
              ref={ref => {
                if (ref) {
                  inputRefs.current[index] = ref;
                }
              }}
              style={styles.codeInput}
              value={code[index]}
              onChangeText={text => handleCodeChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              onFocus={() => {
                // If user taps on an input, clear it for better UX
                const newCode = [...code];
                if (index > 0 && newCode[index - 1] === '') {
                  // If previous inputs are empty, focus on the first empty input
                  const firstEmptyIndex = newCode.findIndex(val => val === '');
                  if (firstEmptyIndex !== -1 && firstEmptyIndex < index) {
                    inputRefs.current[firstEmptyIndex]?.focus();
                  }
                }
              }}
            />
          ))}
      </View>

      {/* Verification button */}
      <TouchableOpacity style={[styles.verifyButton, code.join('').length < 6 && styles.disabledButton]} onPress={handleVerify} disabled={code.join('').length < 6}>
        <Text style={styles.verifyButtonText}>Xác thực</Text>
      </TouchableOpacity>

      {/* Resend code option */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Bạn chưa nhận được mã?{' '}
          {timer > 0 ? (
            <Text style={styles.timerText}>Gửi lại mã ({timer}s)</Text>
          ) : (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendLink}>Gửi lại mã</Text>
            </TouchableOpacity>
          )}
        </Text>
      </View>
      <SuccessModal message="Đăng ký thành công" subMessage="Cảm ơn bạn đã đăng ký XIMI" visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} onContinue={handleContinue} />
      <FailureModal message={message} visible={showFailureModal} onClose={() => setShowFailureModal(false)} onContinue={() => setShowFailureModal(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.fontFamily.LexendBold,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: Fonts.fontFamily.LexendRegular,
  },
  phoneNumber: {
    fontFamily: Fonts.fontFamily.LexendRegular,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: '12%',
  },
  codeInput: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.fontFamily.LexendSemiBold,
  },
  verifyButton: {
    backgroundColor: Colors.main,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: '10%',
    paddingVertical: 12,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#99CCFF',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Fonts.fontFamily.LexendSemiBold,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 11,
    fontFamily: Fonts.fontFamily.LexendRegular,
  },
  resendLink: {
    color: Colors.main,
    fontFamily: Fonts.fontFamily.LexendSemiBold,
    fontSize: 11,
    position: 'relative',
    top: 4,
  },
  timerText: {
    color: '#999999',
  },
});

export default Otp;
