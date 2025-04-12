import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TypeAuthStackParamList, TypeMainStackParamList } from "../navigation";

export const useAuthNavigation = () =>
  useNavigation<NavigationProp<TypeAuthStackParamList>>();

export const useMainNavigation = () =>
  useNavigation<NavigationProp<TypeMainStackParamList>>();
