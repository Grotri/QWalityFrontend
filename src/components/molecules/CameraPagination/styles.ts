import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";
import { getPalette } from "../../../helpers/getPalette";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    pageText: {
      fontSize: getFontSize(17),
      lineHeight: getLineHeight(20),
      paddingHorizontal: 6,
      paddingVertical: 1,
      fontFamily: fonts.semibold,
      color: palette.mainText,
    },
    pageTextActive: {
      textDecorationLine: "underline",
    },
  });
};
