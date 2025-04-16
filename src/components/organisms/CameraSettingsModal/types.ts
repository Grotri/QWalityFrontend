import { ICamera } from "../../pages/Main/types";

export interface ICameraSettingsModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  camera: ICamera;
}
