import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    managerWrapper: {
      flex: 1,
      marginTop: 8,
      marginBottom: 28,
      paddingHorizontal: 34,
      width: "100%",
      alignItems: "center",
    },
    accordion: {
      width: "100%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      paddingVertical: 10,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    headerText: {
      color: palette.mainText,
      fontFamily: fonts.semibold,
    },
    content: {
      backgroundColor: palette.folderOrHighlightedSectionBg,
      borderRadius: 10,
      padding: 8,
      gap: 2,
    },
    inputWrapperStyles: {
      width: "64%",
      height: 22,
    },
    input: {
      backgroundColor: palette.textFieldInFolderBg,
      borderRadius: 6,
      paddingHorizontal: 6,
      height: 22,
      color: palette.mainText,
      fontFamily: fonts.semibold,
      fontSize: 16,
      lineHeight: 21,
      marginBottom: 4,
      width: "100%",
      paddingRight: 36,
    },
    inputLabel: {
      color: palette.labelTransparentText,
    },
    errorStyles: {
      lineHeight: 12,
    },
    dropdownWrapper: {
      width: "64%",
    },
    dropdown: {
      backgroundColor: palette.textFieldInFolderBg,
      height: 22,
      borderRadius: 6,
      paddingHorizontal: 6,
    },
    selectedTextStyle: {
      fontFamily: fonts.semibold,
      fontSize: 16,
      lineHeight: 21,
    },
    itemContainerStyle: {
      paddingVertical: 6,
    },
    btns: {
      width: "100%",
      justifyContent: "flex-end",
      flexDirection: "row",
      gap: 8,
    },
    btn: {
      width: "30%",
      height: 22,
      borderRadius: 6,
    },
    btnText: {
      color: palette.mainText,
      fontFamily: fonts.semibold,
    },
    noAccounts: {
      marginTop: 28,
      fontSize: 16,
      lineHeight: 16,
      fontFamily: fonts.semibold,
      color: palette.sectionTransparentText,
    },
  });
};
