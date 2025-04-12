import { ReactNode } from "react";

export interface IPageTemplate {
  mustScroll?: boolean;
  onPress?: () => void;
  headerText: string;
  onClick?: () => void;
  underlined?: boolean;
  bottomIcon?: ReactNode;
}
