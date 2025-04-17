import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  modal: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: palette.bgMainScreenPopup,
    padding: 12,
    alignItems: "center",
    gap: 12,
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
    marginBottom: 4,
  },
  customStyles: {
    width: "90%",
  },
  customInputStyles: {
    backgroundColor: palette.textFieldBgMainScreenPopup,
    color: palette.mainText,
    fontFamily: fonts.semibold,
  },
  customLabelStyles: {
    color: palette.subTextMainScreenPopup,
  },
  btn: {
    alignSelf: "flex-end",
    marginTop: 18,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingBottom: 2,
  },
  btnText: {
    color: palette.mainText,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 21,
  },
});
