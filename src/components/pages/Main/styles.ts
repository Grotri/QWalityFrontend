import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: palette.bg,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: palette.mainOnlineOfflineBg,
      padding: 16,
      gap: 70,
      alignItems: "center",
    },
    headerSearch: {
      flexDirection: "row",
      gap: 24,
      alignItems: "center",
      flex: 1,
    },
    title: {
      width: 84,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.semibold,
      color: palette.mainText,
    },
    input: {
      flex: 1,
    },
    customInputStyles: {
      height: 22,
      backgroundColor: palette.searchBarBg,
      paddingRight: 28,
      color: palette.mainText,
    },
    emptyList: {
      backgroundColor: palette.subBg,
      padding: 12,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      lineHeight: 16,
      fontFamily: fonts.semibold,
      color: palette.sectionTransparentText,
    },
  });
};
