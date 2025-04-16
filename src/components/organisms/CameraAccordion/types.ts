import { ICamera, IDefect } from "../../pages/Main/types";

export interface ICameraAccordion {
  sections: ICamera[];
  isSettingsCameraModalOpen: boolean;
  setIsSettingsCameraModalOpen: (isOpen: boolean) => void;
  isSortCameraModalOpen: boolean;
  setIsSortCameraModalOpen: (isOpen: boolean) => void;
  selectedDefect: IDefect | null;
  setSelectedDefect: (defect: IDefect | null) => void;
}
