declare namespace profile {
  interface ResponeGetStatus {
    type: string;
    data: {
      status: 'PENDING' | 'ACTIVE' | 'BLOCKED';
      step: 'OTP' | 'NEW_PASSWORD' | 'REGISTER_INFO' | 'REGISTER_SOCIAL_MEDIA' | 'REGISTER_INFO_SUCCESS' | 'COMPLETED' | 'COMPLETED';
    };
  }
  interface ParamsUpdateInfo {
    fullName?: string;
    phone?: string;
    address?: string;
    email?: string;
    dateOfBirth?: string;
    otp?: string;
    currentPassword?: string;
    newPassword?: string;
  }
}
