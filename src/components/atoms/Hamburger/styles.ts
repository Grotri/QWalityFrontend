import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    container: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
    bar: {
      width: 32,
      height: 4,
      backgroundColor: palette.mainText,
      borderRadius: 2,
    },
  });
};
