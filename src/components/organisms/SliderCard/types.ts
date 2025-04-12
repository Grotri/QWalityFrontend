import { GestureResponderEvent } from "react-native";

export interface ISliderCard {
  title: string;
  description: string;
  radioLabels: string[];
  price: string;
  id: number;
  onPress?: (event: GestureResponderEvent) => void;
}
