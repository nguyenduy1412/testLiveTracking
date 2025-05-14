import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { Colors } from '../assets/Colors';
import { Fonts } from '../assets';

const style = StyleSheet.create({
  text: {
    fontSize: Fonts.fontSize[14],
    fontFamily: Fonts.fontFamily.LexendRegular,
    color: Colors.textPrimary,
    fontWeight: '400',
    // textAlign: 'center',
  },
});

interface TextProps {
  text: string;
  color?: string;
  styles?: StyleProp<TextStyle>;
}

const CommonText = (props: TextProps) => {
  const { text, color = Colors.black, styles = {} } = props;
  return (
    <Text allowFontScaling={false} style={[style.text, { color }, styles]}>
      {text || ''}
    </Text>
  );
};

export default CommonText;
