import { getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";
import { getPalette } from "../../../helpers/getPalette";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      position: "relative",
      width: 130,
      height: 130,
      justifyContent: "flex-end",
    },
    gradient: {
      position: "absolute",
      zIndex: -1,
    },
    btn: {
      alignItems: "center",
      alignSelf: "flex-end",
    },
    circle: {
      height: 52,
      width: 52,
      backgroundColor: palette.edgeBtnBg,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    btnText: {
      color: palette.mainText,
      lineHeight: getLineHeight(16),
      fontSize: 12,
      maxWidth: 80,
      fontFamily: fonts.semibold,
      textAlign: "center",
    },
  });
};
