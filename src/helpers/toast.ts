import { toast, ToastOptions } from "@backpackapp-io/react-native-toast";
import { palette } from "../constants/palette";
import { fonts } from "../constants/fonts";
import { TextStyle, ViewStyle } from "react-native";

const MAX_TOASTS = 2;
let activeToastIds: string[] = [];

const baseToastStyles = {
  indicator: { backgroundColor: palette.mainText },
  text: {
    color: palette.mainText,
    fontFamily: fonts.bold,
    fontSize: 16,
  } as TextStyle,
};

const handleToast = (
  type: "success" | "error",
  message: string,
  backgroundColor: string,
  options?: ToastOptions
) => {
  const duration = options?.duration ?? 1400;

  if (activeToastIds.length >= MAX_TOASTS) {
    const oldestId = activeToastIds.shift();
    toast.dismiss(oldestId);
  }

  const id = toast[type](message, {
    duration,
    styles: {
      ...baseToastStyles,
      pressable: {
        backgroundColor,
        borderRadius: 12,
      } as ViewStyle,
    },
    ...options,
  });

  activeToastIds.push(id);

  setTimeout(() => {
    activeToastIds = activeToastIds.filter((tId) => tId !== id);
  }, duration);
};

export const showSuccessToast = (msg: string, opts?: ToastOptions) =>
  handleToast("success", msg, palette.greenOnline, opts);

export const showErrorToast = (msg: string, opts?: ToastOptions) =>
  handleToast("error", msg, palette.red, opts);

export const showInfoToast = (msg: string, opts?: ToastOptions) =>
  handleToast("success", msg, palette.info, opts);
