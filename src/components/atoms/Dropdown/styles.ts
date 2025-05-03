import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      width: "100%",
      zIndex: 1,
    },
    label: {
      paddingLeft: 4,
      color: palette.subTextMainScreenPopup,
      fontFamily: fonts.regular,
    },
    dropdown: {
      backgroundColor: palette.dropdownBgTransparent,
      paddingHorizontal: 8,
      paddingVertical: 0,
      minHeight: 0,
      height: 36,
    },
    textStyle: {
      color: palette.mainText,
      lineHeight: 14,
      fontSize: 14,
      fontFamily: fonts.regular,
    },
    item: {
      minHeight: 0,
      height: "auto",
      paddingHorizontal: 8,
      paddingVertical: 10,
      backgroundColor: palette.dropdownListBgTransparent,
    },
    selectedItem: {
      backgroundColor: palette.dropdownBgTransparent,
    },
  });
};
