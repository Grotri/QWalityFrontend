import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  wrapper: {
    height: 55,
    width: "100%",
    backgroundColor: palette.blue2,
    paddingHorizontal: 20,
    position: "absolute",
    justifyContent: "center",
  },
  rounded: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  btn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: fonts.semibold,
    color: palette.mainText,
  },
});
