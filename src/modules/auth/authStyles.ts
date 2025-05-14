import { StyleSheet } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Fonts } from '../../assets';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: Fonts.fontSize[24],
    fontFamily: Fonts.fontFamily.LexendSemiBold,
    marginBottom: 8,
  },
  titleBold: {
    fontSize: 18,
    fontFamily: Fonts.fontFamily.LexendBold,
    marginBottom: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    gap: 10,
  },
  subtitle: {
    fontSize: 10,
    color: '#101010',
    fontFamily: Fonts.fontFamily.LexendRegular,
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 11,
    marginBottom: 8,
    fontFamily: Fonts.fontFamily.LexendSemiBold,
  },
  forgotPassword: {
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 11,
    fontFamily: Fonts.fontFamily.LexendSemiBold,
    color: Colors.textSecondary,
  },
  input: {
    fontFamily: Fonts.fontFamily.LexendRegular,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  checkboxText: {
    fontSize: 11,
    fontFamily: Fonts.fontFamily.LexendRegular,
  },
  loginButton: {
    backgroundColor: Colors.main,
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonDisabled: {
    backgroundColor: Colors.border,
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.fontFamily.LexendSemiBold,
  },
  loginButtonTextDisabled: {
    color: Colors.nobel,
    fontSize: 16,
    fontFamily: Fonts.fontFamily.LexendSemiBold,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    color: '#666666',
  },
  registerLink: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#666666',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 32,
  },
  socialButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    fontFamily: Fonts.fontFamily.LexendRegular,
    position: 'relative',
    top: -1,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
