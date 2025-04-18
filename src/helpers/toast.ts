import { toast, ToastOptions } from "@backpackapp-io/react-native-toast";
import { palette } from "../constants/palette";
import { fonts } from "../constants/fonts";

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    duration: 1400,
    styles: {
      indicator: { backgroundColor: palette.mainText },
      text: {
        color: palette.mainText,
        fontFamily: fonts.bold,
        fontSize: 16,
      },
      pressable: { backgroundColor: palette.greenOnline, borderRadius: 12 },
    },
    ...options,
  });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    duration: 1400,
    styles: {
      indicator: { backgroundColor: palette.mainText },
      text: {
        color: palette.mainText,
        fontFamily: fonts.bold,
        fontSize: 16,
      },
      pressable: { backgroundColor: palette.red, borderRadius: 12 },
    },
    ...options,
  });
};
