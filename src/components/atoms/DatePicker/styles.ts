import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
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
      fontFamily: fonts.semibold,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: palette.datePickerBg,
    },
    modalContent: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      position: "absolute",
      bottom: 0,
      width: "100%",
      padding: 0,
      margin: 0,
      alignItems: "center",
    },
  });
};
