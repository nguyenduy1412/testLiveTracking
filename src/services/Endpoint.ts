const Endpoint = {
  Auth: {
    LOGIN_GG: 'v1/auth/google',
    LOGIN_FB: 'v1/auth/facebook',
    SIGN_UP: 'v1/auth/signup',
    OTP: 'v1/auth/get-otp',
    OTP_VERIFY: 'v1/auth/verify-otp',
    LOGIN: 'v1/auth/login',
    FORGOT_PASSWORD: 'v1/auth/forgot-password',
    RESET_PASSWORD: 'v1/auth/reset-password',
  },
  Profile: {
    GET_STATUS: 'v1/customer/status',
    GET_INFO: 'v1/customer',
    UPDATE_INFO: 'v1/customer/update',
  },
};

export default Endpoint;
