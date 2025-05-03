import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";
import { getPalette } from "../../../helpers/getPalette";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      width: "100%",
      gap: 10,
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
      width: "83%",
    },
    headerText: {
      color: palette.mainText,
      fontFamily: fonts.bold,
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(27),
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
