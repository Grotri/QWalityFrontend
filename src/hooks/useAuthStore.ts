import uuid from "react-native-uuid";
import { create } from "zustand";
import { credits } from "../constants/credits";
import { EErrors } from "../constants/errors";
import { emailPattern, innPattern } from "../constants/patterns";
import { showErrorToast, showSuccessToast } from "../helpers/toast";
import { IStoreStatus } from "../model/misc";
import { IErrors, initialErrors, initialUser, IUser } from "../model/user";

interface IUseAuthStore extends IStoreStatus {
  user: IUser;
  setUserField: (field: keyof IUser, value: string) => void;
  setUser: (newUser: IUser) => void;
  clearUser: () => void;
  errors: IErrors;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  clearErrors: () => void;
  register: (
    code: string,
    agreement: boolean,
    addAccount: (account: IUser) => void
  ) => void;
  validate: (code: string, agreement: boolean) => boolean;
  login: (
    email: string,
    password: string,
    addAccount: (account: IUser) => void
  ) => void;
  logout: (clearAccounts: () => void) => void;
}

const useAuthStore = create<IUseAuthStore>((set, get) => ({
  loading: false,
  error: null,
  errors: { ...initialErrors },
  user: { ...initialUser },

  clearUser: () => set({ user: { ...initialUser } }),

  setUser: (newUser) => {
    set({ user: { ...newUser } });
  },

  setUserField: (field, value) =>
    set((state) => ({
      user: { ...state.user, [field]: value },
    })),

  logout: (clearAccounts) => {
    set({ user: { ...initialUser } });
    clearAccounts();
  },

  setErrorsField: (field, error) =>
    set((state) => ({ errors: { ...state.errors, [field]: error } })),

  clearErrors: () => set({ errors: { ...initialErrors } }),

  validate: (code, agreement) => {
    const { user } = get();
    const { inn, login, password } = user;

    const newErrors: IErrors = {
      inn:
        !inn || !inn.trim()
          ? EErrors.required
          : !innPattern.test(inn.trim())
          ? EErrors.inn
          : "",
      login: !login.trim()
        ? EErrors.required
        : !emailPattern.test(login.trim())
        ? EErrors.email
        : "",
      code: !code.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
      agreement: !agreement ? EErrors.required : "",
    };

    set({ errors: newErrors });
    return Object.values(newErrors).every((error) => !error);
  },

  register: (code, agreement, addAccount) => {
    const { user, validate } = get();

    if (validate(code, agreement)) {
      try {
        const newUser: IUser = {
          id: uuid.v4(),
          login: user.login.trim(),
          password: user.password.trim(),
          inn: user.inn?.trim(),
          role: user.role,
          theme: "dark",
          fontSize: "default",
        };
        addAccount(newUser);
        set({
          loading: true,
          user: newUser,
        });
        showSuccessToast("Вы успешно зарегистрировались!");
      } catch (error) {
        console.log(error);
        showErrorToast("Произошла ошибка при регистрации");
      } finally {
        set({ loading: false });
      }
    } else {
      showErrorToast(EErrors.fields);
    }
  },

  login: (email, password, addAccount) => {
    try {
      const existingAccount = credits.find(
        (acc) => acc.login === email && acc.password === password
      );
      if (existingAccount) {
        addAccount(existingAccount);
        if (existingAccount.role === "administrator") {
          addAccount(credits[3]);
        }
        set({
          loading: true,
          user: existingAccount,
        });
        showSuccessToast("Вы успешно вошли в аккаунт!");
      } else {
        showErrorToast("Такого аккаунта не существует");
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Произошла ошибка при входе в аккаунт");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
