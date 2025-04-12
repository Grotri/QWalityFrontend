import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 28,
    alignItems: "center",
  },
  fields: {
    paddingTop: 36,
    paddingBottom: 52,
    paddingHorizontal: 12,
    gap: 12,
    width: "100%",
  },
  loginBtn: {
    height: 34,
    borderRadius: 8,
    width: "90%",
    minWidth: "80%",
    marginBottom: 12,
  },
  loginBtnText: {
    color: palette.mainText,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fonts.bold,
  },
  textUnderlined: {
    color: palette.mainText,
    textDecorationLine: "underline",
  },
});
