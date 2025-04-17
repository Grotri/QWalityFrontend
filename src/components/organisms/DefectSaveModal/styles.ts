import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  modal: {
    width: "90%",
    borderRadius: 14,
    backgroundColor: palette.bgMainScreenPopup,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: "center",
    gap: 12,
  },
  mainInfo: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    lineHeight: 21,
    color: palette.mainText,
    fontFamily: fonts.bold,
  },
  name: {
    fontSize: 12,
    lineHeight: 16,
    color: palette.codeTransparentText,
    fontFamily: fonts.regular,
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 42,
  },
  btn: {
    flex: 1,
    height: 27,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    color: palette.mainText,
    fontFamily: fonts.bold,
  },
});
