import { toast, ToastOptions } from "@backpackapp-io/react-native-toast";
import { palette } from "../constants/palette";
import { fonts } from "../constants/fonts";
import { TextStyle, ViewStyle } from "react-native";

const MAX_TOASTS = 2;
let activeToastIds: string[] = [];

const handleToast = (
  type: "success" | "error",
  message: string,
  baseStyles?: {
    pressable?: ViewStyle;
    view?: ViewStyle;
    text?: TextStyle;
    indicator?: ViewStyle;
  },
  options?: ToastOptions
) => {
  const duration = options?.duration ?? 1400;

  if (activeToastIds.length >= MAX_TOASTS) {
    const oldestId = activeToastIds.shift();
    toast.dismiss(oldestId);
  }

  const id = toast[type](message, {
    duration,
    styles: baseStyles,
    ...options,
  });

  activeToastIds.push(id);

  setTimeout(() => {
    activeToastIds = activeToastIds.filter((tId) => tId !== id);
  }, duration);
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  handleToast(
    "success",
    message,
    {
      indicator: { backgroundColor: palette.mainText },
      text: {
        color: palette.mainText,
        fontFamily: fonts.bold,
        fontSize: 16,
      },
      pressable: { backgroundColor: palette.greenOnline, borderRadius: 12 },
    },
    options
  );
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  handleToast(
    "error",
    message,
    {
      indicator: { backgroundColor: palette.mainText },
      text: {
        color: palette.mainText,
        fontFamily: fonts.bold,
        fontSize: 16,
      },
      pressable: { backgroundColor: palette.red, borderRadius: 12 },
    },
    options
  );
};
