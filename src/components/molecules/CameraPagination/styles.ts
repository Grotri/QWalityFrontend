import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    pageText: {
      fontSize: 17,
      lineHeight: 20,
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
