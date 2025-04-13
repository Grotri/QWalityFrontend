import { create } from "zustand";
import { IStoreStatus } from "../model/misc";

interface IUser {
  id: string;
  inn: string;
  email: string;
  password: string;
  subscription?: string;
}

interface IUseAuthStore extends IStoreStatus {
  user: IUser | null;
  setUser: (userData: IUser) => void;
  setUserField: (field: keyof IUser, value: string) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>((set) => ({
  loading: false,
  error: null,
  user: null,
  setUser: (params: IUser) => set({ user: { ...params } }),
  setUserField: (field, value) =>
    set((state) => ({
      user: state.user ? { ...state.user, [field]: value } : null,
    })),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
