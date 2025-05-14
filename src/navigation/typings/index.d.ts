import Wallet from '../views/WalletStack';
export type RootNavigatorParamList = {
  //Auth stack
  AuthStack: { screen?: string; params?: any };
  Login: undefined;
  Otp: { id: string; phoneNumber: string; type?: string };
  SignUp: undefined;
  ForgotPassword: undefined;
  ChangePassword: { phone: string };
  Notification: undefined;
  PhoneUpdate: { id: string };

  //Home stack
  HomeStack: { screen?: string };
  Home: undefined;
  //Bottom stack
  BottomStack: { screen?: string };
  Person: undefined;
  Infomation: undefined;
  HistoryDetail: undefined;

  //Profile stack
  ProfileStack: { screen?: string };
  Profile: undefined;

  //Chat stack
  ChatStack: { screen?: string };
  ListChat: undefined;

  //Wallet stack
  WalletStack: { screen?: string };
  Wallet: undefined;
  SupportCenter: undefined;
  ActiveStack: undefined;
  Rating: undefined;
  TripDetail: undefined;
  TripCancel: undefined;
  Chat: undefined;
  Tracking: undefined;
  
};
