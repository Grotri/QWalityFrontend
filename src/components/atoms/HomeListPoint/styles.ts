import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  listPoint: {
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 8,
    borderRadius: 14,
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  listPointCircle: {
    width: 13,
    height: 13,
    borderRadius: 50,
    opacity: 80,
    backgroundColor: palette.welcomeScreenPoint,
  },
  listPointText: {
    color: palette.welcomeScreenMainText,
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 21,
    borderWidth: 1,
    borderColor: "transparent",
  },
});
