import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { IAccount, initialAccounts } from "../constants/account";
import { showErrorToast, showSuccessToast } from "../helpers/toast";
import { roles } from "../constants/roles";
import { EErrors } from "../constants/errors";
import { emailPattern } from "../constants/patterns";

export interface IErrors {
  login: string;
  password: string;
}

interface IUseAccountStore extends IStoreStatus {
  accounts: IAccount[];
  errors: IErrors[];
  fetchAccounts: () => void;
  addAccount: (account: IAccount) => void;
  changeAccount: (index: number, newAccount: IAccount) => void;
  changeError: (index: number, field: keyof IErrors, value: string) => void;
  refreshErrors: () => void;
  validate: (newAccount: IAccount, index: number) => boolean;
  deleteAccount: (index: number) => void;
}

const useAccountStore = create<IUseAccountStore>((set, get) => ({
  loading: false,
  error: null,
  accounts: [...initialAccounts],
  errors: initialAccounts.map(() => ({ login: "", password: "" })),

  fetchAccounts: () => {
    try {
      set({ loading: true, error: null });
      const accounts = [...initialAccounts];
      set({
        accounts,
        errors: accounts.map(() => ({ login: "", password: "" })),
        loading: false,
        error: false,
      });
    } catch (error) {
      showErrorToast("Не удалось загрузить список управляемых аккаунтов");
      console.error(error);
      set({ error, loading: false });
    }
  },

  addAccount: (account) => {
    const currRole = roles.find((r) => r.id === account.role)?.name;

    try {
      set({ loading: true, error: null });
      set((state) => ({
        accounts: [...state.accounts, account],
        errors: [...state.errors, { login: "", password: "" }],
        loading: false,
        error: false,
      }));
      showSuccessToast(`${currRole} создан`);
    } catch (error) {
      showErrorToast("Не удалось изменить данные");
      console.error(error);
      set({ error, loading: false });
    }
  },

  validate: (newAccount, index) => {
    const { errors } = get();
    const { login, password } = newAccount;

    const newError: IErrors = {
      login: !login.trim()
        ? EErrors.required
        : !emailPattern.test(login.trim())
        ? "Введите корректный email"
        : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? "Пароль должен содержать не менее 8 символов"
        : "",
    };

    const newErrors = [...errors];
    newErrors[index] = { ...newError };
    set({ errors: newErrors });
    return Object.values(newError).every((error) => !error);
  },

  changeAccount: (index, newAccount) => {
    const { accounts, validate } = get();
    const oldAccount = accounts[index];

    if (JSON.stringify(oldAccount) !== JSON.stringify(newAccount)) {
      if (validate(newAccount, index)) {
        try {
          set({ loading: true, error: null });
          set((state) => ({
            accounts: state.accounts.map((account, i) =>
              i === index ? newAccount : account
            ),
            loading: false,
            error: false,
          }));
          showSuccessToast(`Данные ${newAccount.name} изменены`);
        } catch (error) {
          showErrorToast("Не удалось изменить данные");
          console.error(error);
          set({ error, loading: false });
        }
      } else {
        showErrorToast("Сначала корректно заполните поля формы");
      }
    } else {
      showErrorToast("Вы не поменяли данные");
    }
  },

  changeError: (index, field, value) =>
    set((state) => {
      const newErrors = [...state.errors];
      newErrors[index] = { ...newErrors[index], [field]: value };
      return { errors: newErrors };
    }),

  deleteAccount: (index) => {
    const { accounts, errors } = get();
    const userToDelete = accounts[index];
    const role = roles.find((role) => role.id === userToDelete.role);

    try {
      set({ loading: true, error: null });
      set({
        accounts: accounts.filter((account) => account.id !== userToDelete.id),
        errors: errors.filter((_, i) => i !== index),
        loading: false,
        error: false,
      });
      showSuccessToast(`${role?.name} ${userToDelete.name} удален`);
    } catch (error) {
      showErrorToast("Не удалось удалить аккаунт");
      console.error(error);
      set({ error, loading: false });
    }
  },

  refreshErrors: () => {
    const { accounts } = get();
    set({ errors: accounts.map(() => ({ login: "", password: "" })) });
  },
}));

export default useAccountStore;
