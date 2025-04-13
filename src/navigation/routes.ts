import AccountManagement from "../components/pages/AccountManagement";
import Admin from "../components/pages/Admin";
import FAQ from "../components/pages/FAQ";
import ForgotPassword from "../components/pages/ForgotPassword";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Main from "../components/pages/Main";
import Profile from "../components/pages/Profile";
import Registration from "../components/pages/Registration";
import Settings from "../components/pages/Settings";
import TrashBin from "../components/pages/TrashBin";
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
  {
    name: "FAQ",
    component: FAQ,
  },
  {
    name: "Main",
    component: Main,
  },
  {
    name: "Settings",
    component: Settings,
  },
  {
    name: "TrashBin",
    component: TrashBin,
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
