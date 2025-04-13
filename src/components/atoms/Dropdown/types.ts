import { Dispatch, SetStateAction } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IDropdown {
  data: IDropdownData[];
  setValue: (value: string) => void;
  value: string;
  label?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  borderColor?: string;
  arrowDownIconComponent?: JSX.Element;
  arrowUpIconComponent?: JSX.Element;
}

export interface IDropdownData {
  label: string;
  value: string;
}
