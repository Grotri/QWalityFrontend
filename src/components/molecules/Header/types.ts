import { GestureResponderEvent } from "react-native";

export interface IHeader {
  onClick?: (event: GestureResponderEvent) => void;
  headerText: string;
  underlined?: boolean;
}
