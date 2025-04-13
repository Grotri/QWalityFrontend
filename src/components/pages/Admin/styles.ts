import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  adminWrapper: {
    marginTop: 4,
    paddingHorizontal: 54,
    width: "100%",
    alignItems: "center",
  },
  subTitle: {
    color: palette.mainText,
    fontFamily: fonts.semibold,
    marginBottom: 8,
  },
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
  confirmationInputWrapper: {
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  confirmationInput: {
    backgroundColor: palette.textFieldInFolderBg,
    height: 25,
    color: palette.mainText,
    fontFamily: fonts.semibold,
  },
  confirmationInputLabel: {
    color: palette.subTextMainScreenPopup,
  },
  dropdownWrapper: {
    width: "70%",
    marginBottom: 28,
  },
  btn: {
    marginBottom: 20,
    height: 28,
    borderRadius: 6,
    minWidth: "70%",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 23,
    color: palette.mainText,
    fontFamily: fonts.semibold,
  },
  statistics: {
    fontSize: 12,
    lineHeight: 16,
    color: palette.supportTransparentText,
    marginTop: -8,
  },
  modals: {
    width: "100%",
    gap: 20,
  },
  modal: {
    borderRadius: 14,
    backgroundColor: palette.subScreenPopupBg,
    padding: 12,
    alignItems: "center",
  },
  crossIconWrapper: {
    width: "100%",
    position: "relative",
    alignItems: "center",
  },
  crossIcon: {
    position: "absolute",
    left: 0,
  },
  modalTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: fonts.semibold,
    color: palette.mainText,
  },
  modalContent: {
    paddingHorizontal: "6%",
    marginTop: 16,
    gap: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  empty: {
    width: 16,
  },
  dash: {
    width: 16,
    height: 3,
    borderRadius: 50,
    backgroundColor: palette.dashBg,
  },
  flex: {
    flex: 1,
  },
  dropdownStyle: {
    height: 27,
    backgroundColor: palette.dateAndListSelectsPopupBg,
  },
  selectedTextStyle: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.semibold,
  },
  btnModal: {
    flex: 1,
    borderRadius: 8,
    height: 27,
  },
  btnModalText: {
    color: palette.mainText,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.semibold,
  },
  subModalTitle: {
    color: palette.mainText,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.bold,
  },
  btnModalTextBold: {
    color: palette.mainText,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.bold,
  },
});
