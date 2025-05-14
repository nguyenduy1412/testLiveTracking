import { Colors } from '../../assets/Colors';
import { StyleSheet } from 'react-native';

export const stylesSelectLocation = StyleSheet.create({
  container: {},
  dropdown: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: Colors.border,
  },
  dropdownText: {
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  dropdownList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    maxHeight: '70%',
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.black,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});
