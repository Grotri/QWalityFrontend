export const baseColors = {
  white: "#000033",
  black: "#ffffff",
  brightBlue: "#1b50ca",
  blue: "#a6cfff",
  blue2: "#bfdfff",
  blue3: "#a6cfff",
  darkBlue: "#6ab2ff",
  red: "#ec4f4f",
  blueTransparent: "rgba(21, 116, 224, 0.6)", //TODO
  brightBlueTransparent: "rgba(0, 200, 255, 0.85)", //TODO
  error: "rgb(255, 0, 0)",
  info: "rgb(255, 136, 0)",
};

export const lightPalette = {
  ...baseColors,

  // Welcome Screens Section
  welcomeScreenPoint: "rgba(0, 229, 255, 0.8)", //TODO
  welcomeScreenContrastBtn: "#398ff1",
  welcomeScreenSubBtn: baseColors.blue,
  welcomeScreenSubText: "rgba(0, 0, 51, 0.8)",
  welcomeScreenMainText: baseColors.white,
  welcomeScreenScrollNonActivePoint: "rgba(217, 217, 249, 0.7)",
  welcomeScreenScrollActivePoint: "rgba(0, 0, 51, 0.8)",
  welcomeScreenImproveText: "rgba(0, 0, 51, 0.7)",
  welcomeScreenGradientDark: "rgba(5, 5, 5, 0.4)", //TODO
  welcomeScreenGradientLight: "rgba(107, 107, 107, 0)", //TODO

  // Main Screens Section
  bg: "#d9ebff",
  menuBg: baseColors.blue2,
  mainOnlineOfflineBg: baseColors.blue3,
  subBg: baseColors.darkBlue,
  subFolderBg: "#8fc3ff",
  searchBarBg: "#7aa5ee",
  splitBar: "#4f81ff",
  edgeBtnBg: "#62a1ff",
  mainText: baseColors.white,
  gradientLightBlue: "#4DEDFF", //TODO
  gradientBlue: "#053D8F", //TODO
  subscriptionCardBg: "rgba(0, 0, 0, 0.4)", //TODO
  greenOnline: "#00ff40",

  // Main Screen Popups Section
  bgMainScreenPopup: baseColors.blue2,
  textFieldBgMainScreenPopup: "#81baff",
  activePointMainScreenPopup: baseColors.brightBlue,
  pointBgMainScreenPopup: baseColors.blue,
  selectFieldBgMainScreenPopup: baseColors.blue3,
  warningBtnBgMainScreenPopup: baseColors.red,
  textMainScreenPopup: baseColors.white,
  subTextMainScreenPopup: "rgba(0, 0, 51, 0.8)",

  // Sub-Screens Section
  anyBtnOnBgSubScreen: baseColors.blue3,
  warningBtnBg: baseColors.red,
  subScreenPopupBg: "#8cc0ff",
  dateAndListSelectsPopupBg: "#459aff",
  dateAndListBtnsPopupBg: "#459aff",
  folderOrHighlightedSectionBg: "#98c6ff",
  textFieldInFolderBg: "#519fff",
  modalBtns: "#80b9ff",
  sectionTransparentText: "rgba(0, 0, 51, 0.75)",
  supportTransparentText: "rgba(0, 0, 51, 0.6)",
  codeTransparentText: "rgba(0, 0, 51, 0.7)",
  labelTransparentText: "rgba(0, 0, 51, 0.5)",
  dropdownBgTransparent: baseColors.blue3,
  dropdownListBgTransparent: "rgba(166, 207, 255, 0.7)",
  subDropdownListBgTransparent: "rgba(166, 207, 255, 0.8)",
  dashBg: "#0048ff",
  modalBtn: "#4B74DD", //TODO
  trashItemImageBg: "#fdfdfd",
  datePickerBg: "rgba(0, 0, 0, 0.2)", //TODO
  darkBlueBtnBg: "#2f8dff",
};
