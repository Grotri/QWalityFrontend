import { HelpIcon, SettingsIcon, TrashBinIcon } from "../../assets/icons";
import { IMenuItem } from "../components/organisms/Menu/types";

export const menuItems: IMenuItem[] = [
  {
    icon: TrashBinIcon,
    title: "Корзина",
    path: "TrashBin",
  },
  {
    icon: SettingsIcon,
    title: "Настройки",
    path: "Settings",
  },
  {
    icon: HelpIcon,
    title: "Помощь",
    path: "FAQ",
  },
];
