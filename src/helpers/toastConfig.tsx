import { JSX } from "react";
import {
    BaseToast,
    BaseToastProps,
    ErrorToast,
    InfoToast,
} from "react-native-toast-message";
import { palette } from "../constants/palette";

export const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: palette.greenOnline }}
      text1Style={{
        color: palette.mainText,
      }}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: palette.red }}
      text1Style={{
        color: palette.mainText,
      }}
    />
  ),
  info: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <InfoToast
      {...props}
      style={{ backgroundColor: palette.info }}
      text1Style={{
        color: palette.mainText,
      }}
    />
  ),
};
