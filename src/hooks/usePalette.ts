import { getPalette } from "../helpers/getPalette";
import useAuthStore from "./useAuthStore";

export const usePalette = () => {
  const theme = useAuthStore((state) => state.user.theme);
  return getPalette(theme);
};
