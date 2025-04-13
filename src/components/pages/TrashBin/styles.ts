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
  itemWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  trashBinItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: palette.trashItemImageBg,
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    color: palette.mainText,
  },
  itemName: {
    color: palette.mainText,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.semibold,
  },
  itemDate: {
    color: palette.mainText,
  },
  btnText: {
    color: palette.mainText,
    textDecorationLine: "underline",
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
});
