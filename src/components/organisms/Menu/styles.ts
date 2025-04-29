import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    zIndex: 100,
    backgroundColor: palette.blue2,
  },
  header: {
    zIndex: 100,
    height: 73,
    width: "100%",
    backgroundColor: palette.blue2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerBtn: {
    alignItems: "center",
    gap: 2,
    minWidth: 52,
  },
  headerBtnTxt: {
    fontSize: 12,
    lineHeight: 16,
    color: palette.mainText,
  },
});
