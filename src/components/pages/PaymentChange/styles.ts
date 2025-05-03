import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 28,
      marginTop: 40,
      alignItems: "center",
      gap: 36,
    },
    title: {
      color: palette.mainText,
      fontSize: 20,
      lineHeight: 28,
      fontFamily: fonts.semibold,
      textAlign: "center",
    },
    btn: {
      height: 34,
      borderRadius: 12,
      width: "80%",
    },
    btnText: {
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 18,
      fontFamily: fonts.semibold,
    },
  });
};
