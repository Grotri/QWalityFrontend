import { ISliderCard } from "../../organisms/SliderCard/types";

export type ISlider = ISliderCard;

export const slidersInfo: ISlider[] = [
  {
    id: 0,
    title: "Демо",
    description: "Базовый функционал",
    radioLabels: ["1 роль", "1 аккаунт", "1 камера"],
    price: "0",
  },
  {
    id: 1,
    title: "Light",
    description: "Маленький функционал",
    radioLabels: ["3 роли", "5 аккаунтов", "3 камеры"],
    price: "1000",
  },
  {
    id: 2,
    title: "Full",
    description: "Расширенный функционал",
    radioLabels: ["4 роли", "10 аккаунтов", "5 камер"],
    price: "5999.99",
  },
  {
    id: 3,
    title: "Strong",
    description: "Широкий функционал",
    radioLabels: ["4 роли", "100 аккаунтов", "50 камер"],
    price: "9999.99",
  },
];
