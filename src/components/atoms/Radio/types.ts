import { StyleProp, ViewStyle } from "react-native";

export interface IRadio {
  label: string;
  isChecked: boolean;
  setIsChecked?: () => void;
  style?: StyleProp<ViewStyle>;
}
