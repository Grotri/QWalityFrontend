import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";
import { getPalette } from "../../../helpers/getPalette";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    modal: {
      width: "90%",
      borderRadius: 14,
      backgroundColor: palette.bgMainScreenPopup,
      paddingVertical: 12,
      paddingHorizontal: 28,
      alignItems: "center",
      gap: 12,
    },
    mainInfo: {
      width: "100%",
      alignItems: "center",
    },
    title: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      color: palette.mainText,
      fontFamily: fonts.bold,
      textAlign: "center",
    },
    name: {
      fontSize: getFontSize(12),
      lineHeight: getLineHeight(16),
      color: palette.codeTransparentText,
      fontFamily: fonts.regular,
    },
    btns: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      gap: 42,
    },
    btn: {
      flex: 1,
      height: 27,
      borderRadius: 8,
    },
    btnText: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      color: palette.mainText,
      fontFamily: fonts.bold,
    },
  });
};
