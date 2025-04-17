import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  bottomIcon: {
    position: "absolute",
    right: 12,
  },
  bottomIconContainer: {
    height: 120,
  },
  fixBackground: {
    backgroundColor: palette.blue2,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
});
