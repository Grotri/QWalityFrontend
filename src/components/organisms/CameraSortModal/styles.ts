import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  modal: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: palette.bgMainScreenPopup,
    padding: 12,
    alignItems: "center",
    gap: 16,
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
  content: {
    paddingHorizontal: 8,
    gap: 26,
  },
  dropdown: {
    backgroundColor: palette.subDropdownListBgTransparent,
    height: 24,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 3,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.semibold,
    color: palette.mainText,
  },
});
