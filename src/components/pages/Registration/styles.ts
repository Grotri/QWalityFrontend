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
  confirmationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-end",
  },
  confirmationInput: {
    width: "50%",
    flex: 1,
  },
  codeBtn: {
    height: 30,
    width: "50%",
    flex: 1,
    borderRadius: 8,
  },
  codeBtnText: {
    color: palette.mainText,
    lineHeight: 19,
  },
  createBtn: {
    height: 34,
    borderRadius: 8,
    width: "90%",
    minWidth: "80%",
  },
  createBtnText: {
    color: palette.mainText,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fonts.bold,
  },
  checkboxWrapper: {
    width: "100%",
    paddingRight: 12,
    paddingLeft: 20,
    marginTop: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkboxContainer: {
    width: 18,
    height: 18,
    backgroundColor: palette.white,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    color: palette.mainText,
    lineHeight: 19,
    flex: 1,
  },
  checkboxTextUnderlined: {
    textDecorationLine: "underline",
  },
});
