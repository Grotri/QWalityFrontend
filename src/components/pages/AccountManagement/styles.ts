import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 28,
    alignItems: "center",
  },
  managerWrapper: {
    marginTop: 36,
    paddingHorizontal: 6,
    width: "100%",
    alignItems: "center",
  },
  accordion: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    color: palette.mainText,
    fontFamily: fonts.semibold,
  },
  content: {
    backgroundColor: palette.folderOrHighlightedSectionBg,
    borderRadius: 10,
    padding: 8,
  },
  input: {
    backgroundColor: palette.textFieldInFolderBg,
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 20,
    color: palette.mainText,
    fontFamily: fonts.semibold,
    marginBottom: 4,
    width: "60%",
  },
  inputLabel: {
    color: palette.labelTransparentText,
    fontSize: 12,
    lineHeight: 16,
  },
  dropdownWrapper: {
    width: "60%",
  },
  dropdownLabel: {
    color: palette.labelTransparentText,
    fontSize: 12,
    lineHeight: 16,
  },
  dropdown: {
    backgroundColor: palette.textFieldInFolderBg,
    height: 20,
  },
  itemContainerStyle: {
    paddingVertical: 8,
  },
  btns: {
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 8,
  },
  btn: {
    width: "28%",
    height: 20,
    borderRadius: 6,
  },
  btnText: {
    color: palette.subTextMainScreenPopup,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.semibold,
  },
});
