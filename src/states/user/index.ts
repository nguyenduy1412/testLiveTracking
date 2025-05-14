import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { userInfo } from './typings';
import AsyncStorage from '@react-native-async-storage/async-storage';

type State = {
  token: string;
  setToken: (token: string) => void;
  user: userInfo;
  setUser: (user: userInfo) => void;
};

export const userStore = create<State, [['zustand/persist', State]]>(
  persist(
    set => ({
      user: {
        fullName: '',
        phone: '',
        id: '',
        avatar: '',
      },
      token: '',
      setUser: (user: userInfo) => set({ user }),
      setToken: async (token: string) => {
        await AsyncStorage.setItem('token', token);
        set({ token });
      },
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
