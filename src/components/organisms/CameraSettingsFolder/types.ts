import { ICamera } from "../../pages/Main/types";

export interface ICameraSettingsFolder {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  camera: ICamera;
}
