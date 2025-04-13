import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  bar: {
    width: 32,
    height: 4,
    backgroundColor: palette.mainText,
    borderRadius: 2,
  },
});
