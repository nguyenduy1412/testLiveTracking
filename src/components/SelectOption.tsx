// src/components/SelectOption.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../assets/Colors';

interface SelectOptionProps {
  option: string[];
}

const SelectOption: React.FC<SelectOptionProps> = ({ option }) => {
  const [value, setValue] = useState<string | null>('');

  const data = option.map(item => ({ label: item, value: item }));

  useEffect(() => {
    if (data && data.length > 0) {
      setValue(data[0].value); // chọn phần tử đầu làm mặc định
    }
  }, [option]);

  const isActive = (val: string | null) => val !== null; // hoặc tùy chỉnh nâng cao

  return (
    <View style={styles.container}>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={item => setValue(item.value)}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.dropdownContainer}
        renderItem={item => {
          const isSelected = item.value === value;
          return (
            <View style={[styles.item, isSelected && { backgroundColor: Colors.main, borderRadius: 10 }]}>
              <Text style={[styles.itemText, isSelected && { color: '#fff' }]}>{item.label}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dropdown: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderStyle: {
    color: Colors.black,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.black,
  },
  itemTextStyle: {
    fontSize: 14,
    color: Colors.black,
  },
  dropdownContainer: {
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
});

export default SelectOption;
