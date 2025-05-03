import { StyleSheet } from "react-native";
import { getPalette } from "../../../helpers/getPalette";
import { fonts } from "../../../constants/fonts";

export const getStyles = (theme: "light" | "dark") => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: palette.subBg,
      paddingRight: 16,
      paddingLeft: 20,
      paddingVertical: 12,
      alignItems: "center",
      gap: 20,
    },
    headerMain: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      flex: 1,
    },
    cameraNameWrapper: {
      width: "44%",
    },
    cameraName: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    cameraTitle: {
      width: "72%",
      color: palette.mainText,
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.semibold,
    },
    defectText: {
      color: palette.mainText,
      lineHeight: 19,
      fontFamily: fonts.regular,
    },
    line: {
      alignSelf: "stretch",
      width: 3,
      borderRadius: 50,
      backgroundColor: palette.splitBar,
    },
    stateWrapper: {
      gap: 8,
    },
    state: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    circle: {
      height: 8,
      width: 8,
      borderRadius: 50,
    },
    stateName: {
      color: palette.mainText,
      lineHeight: 19,
      fontFamily: fonts.regular,
    },
    uptime: {
      color: palette.mainText,
      lineHeight: 19,
      fontFamily: fonts.regular,
    },
    contentWrapper: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 20,
      backgroundColor: palette.subFolderBg,
    },
    settingsWrapper: {
      width: "100%",
      alignItems: "center",
      gap: 6,
    },
    settingsIcons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    icon: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    iconTitle: {
      fontSize: 16,
      lineHeight: 21,
      fontFamily: fonts.regular,
      color: palette.mainText,
    },
    activeOption: {
      color: palette.brightBlue,
    },
    horizontalLine: {
      height: 2,
      width: "80%",
      borderRadius: 50,
      backgroundColor: palette.splitBar,
      opacity: 0.8,
    },
    defects: {
      gap: 12,
    },
    noDefects: {
      fontSize: 16,
      lineHeight: 16,
      fontFamily: fonts.semibold,
      color: palette.sectionTransparentText,
      alignSelf: "center",
    },
  });
};
