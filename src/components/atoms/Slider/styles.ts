import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    sliderWrapper: {
      width: "100%",
      position: "relative",
      marginBottom: 36,
    },
    slider: {
      width: "100%",
    },
    sliderTrack: {
      height: 7,
      borderRadius: 6,
    },
    sliderThumb: {
      boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
      width: 15,
      height: 15,
    },
    tooltipWrapper: {
      alignSelf: "flex-start",
      position: "absolute",
    },
    tooltipText: {
      color: palette.mainText,
      fontFamily: fonts.semibold,
      lineHeight: 20,
      width: "100%",
      textAlign: "center",
      position: "absolute",
      bottom: 2,
    },
  });
};
