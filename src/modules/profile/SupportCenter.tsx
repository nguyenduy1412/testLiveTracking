import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import CommonText from '../../components/CommonText';
import { Fonts } from '../../assets';
import ButtonTextField from '../../components/ButtonTextField';
import { Linking } from 'react-native';
import { Colors } from '../../assets/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const SupportCenter = () => {
  const handleRedirect = () => {
    Linking.openURL('https://facebook.com');
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Header title="Trung tâm hỗ trợ" />
      <CommonText text="Bạn gặp phải sự cố gì" styles={styles.contentTitle} />
      <View style={{ paddingHorizontal: 20 }}>
        <ButtonTextField text="Thanh toán" onPress={handleRedirect} />
        <ButtonTextField text="Khuyến mãi & ưu đãi" onPress={handleRedirect} />
        <ButtonTextField text="Đơn hàng & vận chuyển" onPress={handleRedirect} />
        <ButtonTextField text="Phản hồi chất lượng tài xế & phương tiện" onPress={handleRedirect} />
        <ButtonTextField text="Tuyển dụng nhà xe & tài xế" onPress={handleRedirect} />
      </View>
    </SafeAreaView>
  );
};

export default SupportCenter;

const styles = StyleSheet.create({
  contentTitle: {
    paddingHorizontal: 20,
    fontFamily: Fonts.fontFamily.LexendBold,
    marginBottom: 10,
  },
});
