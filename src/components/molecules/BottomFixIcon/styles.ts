import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  gradient: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: -1,
  },
  btn: {
    alignItems: "center",
    padding: 4,
  },
  circle: {
    height: 52,
    width: 52,
    backgroundColor: palette.edgeBtnBg,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: palette.mainText,
    lineHeight: 19,
    maxWidth: 90,
    textAlign: "center",
  },
});
