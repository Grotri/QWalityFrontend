import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { fonts } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 28,
    alignItems: "center",
  },
  flatWrapper: {
    marginBottom: "3%",
    flex: 1,
    position: "relative",
  },
  leftIcon: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: [{ translateY: "-50%" }],
    paddingVertical: 12,
  },
  rightIcon: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: "-50%" }, { scaleX: -1 }],
    zIndex: 2,
    paddingVertical: 12,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: "7%",
  },
  dot: {
    backgroundColor: palette.welcomeScreenScrollNonActivePoint,
    width: 11,
    height: 11,
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: palette.welcomeScreenScrollActivePoint,
    width: 18,
    height: 18,
    borderRadius: 50,
  },
  cancelBtn: {
    height: 38,
    width: "75%",
    borderRadius: 14,
  },
  cancelBtnText: {
    color: palette.welcomeScreenSubText,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.black,
  },
});
