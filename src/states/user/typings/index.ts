export interface userInfo {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  phone?: string | null;
  password?: string | null;
  fullName?: string | null;
  otp?: string | null;
  fcmToken?: string | null;
  email?: string | null;
  referralCode?: string | null;
  lastLoginDate?: string | null;
  isLogin?: boolean;
  isVerified?: boolean;
  bankName?: string | null;
  bankAccountNumber?: string | null;
  bankAccountName?: string | null;
  avatar?: string;
  dateOfBirth?: string | null;
  address?: string | null;
  status?: 'PENDING' | 'ACTIVE' | 'INACTIVE';
  facebookId?: string | null;
  googleId?: string | null;
}
