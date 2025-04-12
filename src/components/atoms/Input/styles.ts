import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  label: {
    color: palette.mainText,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 19,
    paddingLeft: 4,
  },
  input: {
    backgroundColor: palette.white,
    borderRadius: 8,
    height: 30,
    paddingVertical: 0,
    paddingHorizontal: 8,
    color: palette.black,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 19,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
