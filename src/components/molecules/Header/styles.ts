import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      width: "100%",
      gap: 8,
      alignItems: "center",
      padding: 28,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      position: "relative",
    },
    headerTextWrapper: {
      position: "absolute",
      left: "50%",
      transform: [{ translateX: "-50%" }],
    },
    shortHeaderTextWrapper: {
      width: "84%",
    },
    headerText: {
      color: palette.mainText,
      fontFamily: fonts.bold,
      fontSize: 20,
      lineHeight: 27,
      textAlign: "center",
    },
    line: {
      backgroundColor: palette.blue3,
      height: 3,
      width: "52%",
      opacity: 0.75,
    },
  });
};
