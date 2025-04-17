import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  managerWrapper: {
    marginTop: 16,
    paddingHorizontal: 28,
    width: "100%",
  },
  accordion: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  headerText: {
    flexWrap: "wrap",
    fontSize: 20,
    lineHeight: 27,
    color: palette.mainText,
    fontFamily: fonts.bold,
    maxWidth: "80%",
  },
  content: {
    backgroundColor: palette.folderOrHighlightedSectionBg,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 22,
    color: palette.mainText,
    fontFamily: fonts.semibold,
  },
});
