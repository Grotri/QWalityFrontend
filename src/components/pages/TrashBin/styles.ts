import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  clearBtn: {
    alignItems: "center",
    backgroundColor: palette.bg,
    padding: 4,
    gap: 2,
  },
  circle: {
    height: 52,
    width: 52,
    backgroundColor: palette.edgeBtnBg,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtnText: {
    color: palette.mainText,
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    fontFamily: fonts.semibold,
  },
  modal: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: palette.subScreenPopupBg,
    padding: 12,
    alignItems: "center",
    gap: 27,
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
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 20,
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
  emptyText: {
    color: palette.supportTransparentText,
  },
});
