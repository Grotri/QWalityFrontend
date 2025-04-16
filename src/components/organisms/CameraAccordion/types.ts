import { ICamera } from "../../pages/Main/types";

export interface ICameraAccordion {
  sections: ICamera[];
  isSettingsCameraModalOpen: boolean;
  setIsSettingsCameraModalOpen: (isOpen: boolean) => void;
}
