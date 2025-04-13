import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  profileWrapper: {
    marginTop: 16,
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 28,
  },
  card: {
    backgroundColor: palette.folderOrHighlightedSectionBg,
    borderRadius: 12,
    width: "85%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  cardPointTitle: {
    color: palette.sectionTransparentText,
    fontSize: 12,
    lineHeight: 16,
  },
  cardPointData: {
    color: palette.mainText,
    lineHeight: 20,
    fontFamily: fonts.semibold,
  },
  btn: {
    width: "62%",
    height: 35,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 16,
    color: palette.mainText,
    fontFamily: fonts.bold,
  },
  input: {
    backgroundColor: palette.textFieldInFolderBg,
    borderRadius: 6,
    paddingHorizontal: 4,
    height: 19,
    color: palette.mainText,
    fontFamily: fonts.semibold,
    marginTop: 1,
  },
  confirmationWrapper: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-end",
  },
  confirmationInputWrapper: {
    width: "50%",
    flex: 1,
  },
  confirmationInput: {
    backgroundColor: palette.textFieldInFolderBg,
    height: 27,
    color: palette.mainText,
    fontFamily: fonts.semibold,
  },
  confirmationInputLabel: {
    fontSize: 12,
    lineHeight: 17,
    color: palette.codeTransparentText,
  },
  codeBtn: {
    height: 27,
    width: "50%",
    flex: 1,
    borderRadius: 8,
  },
  codeBtnText: {
    color: palette.mainText,
    fontSize: 12,
    lineHeight: 18,
  },
  supportTextWrapper: {
    alignItems: "center",
  },
  supportText: {
    lineHeight: 16,
    fontSize: 12,
    color: palette.supportTransparentText,
  },
  supportTextUnderlined: {
    textDecorationLine: "underline",
  },
});
