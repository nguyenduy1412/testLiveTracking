import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { ReactElement, ReactNode } from 'react';
import { Fonts, Icons } from '../assets';

interface ButtonProps {
  text: string;
  color?: string;
  textStyles?: TextStyle;
  buttonStyles?: ViewStyle;
  onPress: () => void | Promise<void>;
  isDisable?: boolean;
  backgroundColor?: string;
  children?: ReactElement | ReactNode;
  isLoading?: boolean;
}
const ButtonTextField = (props: ButtonProps) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{ fontSize: Fonts.fontSize[14], fontFamily: Fonts.fontFamily.LexendRegular }}>{text}</Text>
      <Icons.ArrowRight />
    </TouchableOpacity>
  );
};
export default ButtonTextField;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4D4D4',
    marginVertical: 5,
  },
});
