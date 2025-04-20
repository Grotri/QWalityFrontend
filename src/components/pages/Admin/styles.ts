import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  adminWrapper: {
    marginTop: 4,
    paddingHorizontal: 54,
    width: "100%",
    alignItems: "center",
    paddingBottom: 28,
  },
  subTitle: {
    color: palette.mainText,
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 12,
  },
  confirmationInputWrapper: {
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  confirmationInput: {
    backgroundColor: palette.textFieldInFolderBg,
    height: 32,
    color: palette.mainText,
    fontFamily: fonts.semibold,
  },
  confirmationInputLabel: {
    color: palette.subTextMainScreenPopup,
    fontSize: 16,
    lineHeight: 20,
  },
  dropdownWrapper: {
    paddingHorizontal: 12,
    marginBottom: 28,
  },
  dropdownLabelStyle: {
    fontSize: 16,
    lineHeight: 19,
  },
  dropdownMainStyle: {
    height: 32,
    borderRadius: 10,
    backgroundColor: palette.textFieldInFolderBg,
  },
  selectedMainTextStyle: {
    fontSize: 16,
    lineHeight: 20,
  },
  btn: {
    marginBottom: 20,
    height: 35,
    borderRadius: 12,
    minWidth: "72%",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 23,
    color: palette.mainText,
    fontFamily: fonts.semibold,
  },
  statistics: {
    color: palette.supportTransparentText,
  },
});
