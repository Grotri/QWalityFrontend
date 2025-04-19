import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import uuid from "react-native-uuid";
import { EErrors } from "../constants/errors";
import { showErrorToast, showSuccessToast } from "../helpers/toast";
import { emailPattern } from "../constants/patterns";

export interface IUser {
  id: string;
  inn: string;
  email: string;
  password: string;
  subscription?: string;
}

export const initialUser: IUser = {
  id: "",
  inn: "",
  email: "",
  password: "",
};

interface IErrors {
  inn: string;
  email: string;
  code: string;
  password: string;
  agreement: string;
}

const initialErrors: IErrors = {
  inn: "",
  email: "",
  code: "",
  password: "",
  agreement: "",
};

interface IUseAuthStore extends IStoreStatus {
  user: IUser;
  setUserField: (field: keyof IUser, value: string) => void;
  setUser: (newUser: IUser) => void;
  clearUser: () => void;
  errors: IErrors;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  clearErrors: () => void;
  register: (code: string, agreement: boolean) => void;
  validate: (code: string, agreement: boolean) => boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>((set, get) => ({
  loading: false,
  error: null,
  errors: { ...initialErrors },
  user: { ...initialUser },

  clearUser: () => set({ user: { ...initialUser } }),

  setUser: (newUser) => set({ user: { ...newUser } }),

  setUserField: (field, value) =>
    set((state) => ({
      user: { ...state.user, [field]: value },
    })),

  logout: () => set({ user: { ...initialUser } }),

  setErrorsField: (field, error) =>
    set((state) => ({ errors: { ...state.errors, [field]: error } })),

  clearErrors: () => set({ errors: { ...initialErrors } }),

  validate: (code, agreement) => {
    const { user } = get();
    const { inn, email, password } = user;

    const newErrors: IErrors = {
      inn: !inn
        ? EErrors.required
        : inn.length !== 10 && inn.length !== 12
        ? "Инн должен содержать 10 или 12 цифр"
        : "",
      email: !email.trim()
        ? EErrors.required
        : !emailPattern.test(email.trim())
        ? "Введите корректный email"
        : "",
      code: !code.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? "Пароль должен содержать не менее 8 символов"
        : "",
      agreement: !agreement ? EErrors.required : "",
    };

    set({ errors: newErrors });
    return Object.values(newErrors).every((error) => !error);
  },

  register: (code, agreement) => {
    const { validate } = get();

    if (validate(code, agreement)) {
      try {
        set((state) => ({
          loading: true,
          user: {
            ...state.user,
            id: uuid.v4(),
          },
        }));
        showSuccessToast("Вы успешно зарегистрировались!");
      } catch (error) {
        console.log(error);
        showErrorToast("Произошла ошибка при регистрации");
      } finally {
        set({ loading: false });
      }
    } else {
      showErrorToast("Сначала заполните поля формы");
    }
  },

  login: (email, password) => {
    try {
      set({
        loading: true,
        user: {
          id: uuid.v4(),
          inn: "1122123450",
          email,
          password,
          subscription: "1",
        },
      });
      showSuccessToast("Вы успешно вошли в аккаунт!");
    } catch (error) {
      console.log(error);
      showErrorToast("Произошла ошибка при входе в аккаунт");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
