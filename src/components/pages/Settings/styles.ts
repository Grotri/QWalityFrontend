import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 36,
      marginTop: 12,
      alignItems: "center",
    },
    dropdownWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    dropdownStyle: {
      height: 28,
    },
    dropdownText: {
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.semibold,
    },
    wrapperStyle: {
      width: 94,
    },
    btn: {
      height: 34,
      borderRadius: 10,
      width: "64%",
    },
    btnText: {
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.semibold,
    },
    version: {
      color: palette.supportTransparentText,
      fontSize: 12,
      lineHeight: 16,
      fontFamily: fonts.semibold,
    },
    modal: {
      width: "90%",
      paddingVertical: 16,
      paddingHorizontal: 30,
      borderRadius: 14,
      backgroundColor: palette.subScreenPopupBg,
      alignItems: "center",
      gap: 20,
    },
    modalText: {
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.bold,
    },
    modalBtns: {
      flexDirection: "row",
      gap: 32,
      alignItems: "center",
    },
    modalBtn: {
      flex: 1,
      height: 27,
      borderRadius: 8,
    },
    modalBtnText: {
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.bold,
    },
    confirmationWrapper: {
      flexDirection: "row",
      gap: 14,
      marginTop: -12,
    },
    customStyles: {
      flex: 1,
    },
    codeBtn: {
      width: "44%",
      height: 27,
      borderRadius: 8,
      marginTop: 21,
    },
    modalBtnCodeText: {
      color: palette.mainText,
      fontSize: 12,
      lineHeight: 19,
      fontFamily: fonts.regular,
    },
    customInputStyles: {
      height: 27,
      fontFamily: fonts.semibold,
    },
    customLabelStyles: {
      color: palette.codeTransparentText,
      fontSize: 12,
      lineHeight: 19,
    },
  });
};
