import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 36,
    marginTop: 12,
    alignItems: "center",
  },
  dropdownWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dropdownStyle: {
    height: 28,
  },
  dropdownText: {
    color: palette.mainText,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.semibold,
  },
  wrapperStyle: {
    width: 94,
  },
  btn: {
    height: 34,
    borderRadius: 10,
    width: "64%",
  },
  btnText: {
    color: palette.mainText,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.semibold,
  },
  version: {
    color: palette.supportTransparentText,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.semibold,
  },
});
