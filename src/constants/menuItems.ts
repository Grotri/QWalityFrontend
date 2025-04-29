import { FC } from "react";
import { HelpIcon, SettingsIcon, TrashBinIcon } from "../../assets/icons";
import { IIcon } from "../../assets/icons/types";
import { TypeMainStackParamList } from "../navigation";

export interface IMenuItem {
  icon: FC<IIcon>;
  title: string;
  path: keyof TypeMainStackParamList;
}

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
