import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      width: "100%",
    },
    modals: {
      width: "92%",
      gap: 12,
    },
    modal: {
      borderRadius: 14,
      backgroundColor: palette.subScreenPopupBg,
      padding: 12,
      alignItems: "center",
    },
    crossIconWrapper: {
      width: "100%",
      position: "relative",
      alignItems: "center",
    },
    crossIcon: {
      position: "absolute",
      left: 0,
    },
    modalTitle: {
      fontSize: 20,
      lineHeight: 27,
      fontFamily: fonts.bold,
      color: palette.mainText,
    },
    modalContent: {
      paddingHorizontal: "6%",
      marginTop: 16,
      gap: 20,
    },
    row: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
    },
    empty: {
      width: 16,
    },
    dash: {
      width: 16,
      height: 3,
      borderRadius: 50,
      backgroundColor: palette.dashBg,
    },
    flex: {
      flex: 1,
    },
    dropdownStyle: {
      height: 27,
      backgroundColor: palette.dateAndListSelectsPopupBg,
    },
    selectedTextStyle: {
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.semibold,
    },
    btnModal: {
      flex: 1,
      borderRadius: 8,
      height: 27,
    },
    btnModalText: {
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.semibold,
    },
    subModalTitle: {
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.bold,
    },
    btnModalTextBold: {
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.bold,
    },
  });
};
