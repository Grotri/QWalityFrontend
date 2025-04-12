import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: 8,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
    height: 30,
  },
  headerTextWrapper: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  headerText: {
    color: palette.mainText,
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 27,
  },
  line: {
    backgroundColor: palette.blue3,
    height: 3,
    width: "52%",
    opacity: 0.75,
  },
});
