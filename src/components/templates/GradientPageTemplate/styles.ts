import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.gradientBlue,
    },
    scrollContainer: {
      flexGrow: 1,
    },
  });
};
