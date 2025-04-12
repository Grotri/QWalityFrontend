import { ComponentType } from "react";

export interface IAuthRoute {
  name: keyof TypeAuthStackParamList;
  component: ComponentType;
}

export interface IMainRoute {
  name: keyof TypeMainStackParamList;
  component: ComponentType;
}

export type TypeAuthStackParamList = {
  Home: undefined;
  Registration: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

export type TypeMainStackParamList = {
  Profile: undefined;
  Admin: undefined;
  AccountManagement: undefined;
};
