import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  datePicker: {
    height: 27,
    borderRadius: 8,
    backgroundColor: palette.dateAndListSelectsPopupBg,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    color: palette.mainText,
    fontSize: 16,
    lineHeight: 21,
  },
});
