import { JSX } from "react";
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { palette } from "../constants/palette";
import { usePalette } from "../hooks/usePalette";

export const toastConfig = () => {
  const themePalette = usePalette();

  return {
    success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: palette.greenOnline,
          marginTop: 12,
          borderLeftColor: themePalette.mainText,
        }}
        text1Style={{
          color: palette.mainText,
        }}
      />
    ),
    error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{
          backgroundColor: palette.red,
          marginTop: 12,
          borderLeftColor: themePalette.mainText,
        }}
        text1Style={{
          color: palette.mainText,
        }}
      />
    ),
    info: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
      <InfoToast
        {...props}
        style={{
          backgroundColor: palette.info,
          marginTop: 12,
          borderLeftColor: themePalette.mainText,
        }}
        text1Style={{
          color: palette.mainText,
        }}
      />
    ),
  };
};
