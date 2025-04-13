import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  bottomIcon: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
  fixBackground: {
    backgroundColor: palette.blue2,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: -1000,
  },
});
