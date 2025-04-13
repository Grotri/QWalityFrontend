import { HelpIcon, SettingsIcon, TrashBinIcon } from "../../assets/icons";
import { IMenuItem } from "../components/molecules/Menu/types";

export const menuItems: IMenuItem[] = [
  {
    icon: TrashBinIcon,
    title: "Корзина",
    path: "FAQ",
  },
  {
    icon: SettingsIcon,
    title: "Настройки",
    path: "FAQ",
  },
  {
    icon: HelpIcon,
    title: "Помощь",
    path: "FAQ",
  },
];
