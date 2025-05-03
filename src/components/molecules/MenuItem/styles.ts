import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";
import { getPalette } from "../../../helpers/getPalette";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      height: 55,
      width: "100%",
      backgroundColor: palette.blue2,
      paddingHorizontal: 20,
      position: "absolute",
      justifyContent: "center",
    },
    rounded: {
      borderBottomLeftRadius: 14,
      borderBottomRightRadius: 14,
    },
    btn: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    text: {
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(27),
      fontFamily: fonts.semibold,
      color: palette.mainText,
    },
  });
};
