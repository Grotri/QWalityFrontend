import { lightPalette } from "../constants/lightPalette";
import { palette as darkPalette } from "../constants/palette";

export const getPalette = (theme: "light" | "dark") =>
  theme === "dark" ? darkPalette : lightPalette;
