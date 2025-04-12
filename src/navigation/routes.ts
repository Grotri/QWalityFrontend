import AccountManagement from "../components/pages/AccountManagement";
import Admin from "../components/pages/Admin";
import ForgotPassword from "../components/pages/ForgotPassword";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Profile from "../components/pages/Profile";
import Registration from "../components/pages/Registration";
import { IAuthRoute, IMainRoute } from "./types";

export const mainRoutes: IMainRoute[] = [
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Admin",
    component: Admin,
  },
  {
    name: "AccountManagement",
    component: AccountManagement,
  },
];

export const authRoutes: IAuthRoute[] = [
  {
    name: "Home",
    component: Home,
  },
  {
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    name: "Login",
    component: Login,
  },
  {
    name: "Registration",
    component: Registration,
  },
];
