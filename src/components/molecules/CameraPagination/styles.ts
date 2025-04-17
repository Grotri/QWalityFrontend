import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
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
