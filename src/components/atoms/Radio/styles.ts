import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    radioWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    radio: {
      backgroundColor: palette.blue,
      borderRadius: "50%",
      width: 18,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    radioChecked: {
      backgroundColor: palette.brightBlue,
      borderRadius: "50%",
      width: 10,
      height: 10,
    },
    radioText: {
      color: palette.mainText,
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(27),
    },
  });
};
