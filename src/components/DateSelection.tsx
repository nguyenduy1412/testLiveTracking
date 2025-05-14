import { Colors } from '../assets/Colors';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CommonText from './CommonText';
import DatePicker from 'react-native-date-picker';
import { Fonts } from '../assets';

const styles = StyleSheet.create({
  wrapper: {},
  wrapperInput: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.border,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // ✅ Shadow cho Android
    elevation: 4,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontWeight: '800',
    fontSize: Fonts.fontSize[13],
  },
  labelInput: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  required: {
    color: Colors.red,
    marginTop: 2,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // ✅ Shadow cho Android
    elevation: 4,
  },
});

interface DateSelectionProps {
  onDateChange: (date: string) => void;
  defaultDate?: string;
}

const DateSelection: React.FC<DateSelectionProps> = ({ onDateChange, defaultDate }) => {
  const [date, setDate] = useState(new Date(defaultDate || '1985-01-01'));
  console.log('🚀 ~ date:', date);
  const [isDateSelected, setDateSelected] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDateChange = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDate(new Date(formattedDate));
    setDateSelected(true);
    onDateChange(formattedDate);
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <TouchableOpacity style={styles.wrapperInput} onPress={() => setOpen(true)}>
          <CommonText styles={styles.input} text={isDateSelected ? date.toLocaleDateString('vi') : 'Chọn ngày sinh'} />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        title="Chọn ngày sinh"
        locale={'vi'}
        maximumDate={new Date('2010-01-01')}
        minimumDate={new Date('1945-01-01')}
        onConfirm={date => {
          setOpen(false);
          handleDateChange(date);
        }}
        onCancel={() => setOpen(false)}
        confirmText="Xác nhận"
        cancelText="Huỷ"
      />
    </View>
  );
};

export default DateSelection;
