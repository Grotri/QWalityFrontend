import uuid from "react-native-uuid";
import { create } from "zustand";
import { initialCameras } from "../constants/cameras";
import { EErrors } from "../constants/errors";
import { linkPattern } from "../constants/patterns";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../helpers/toast";
import { ICamera } from "../model/camera";
import { IStoreStatus } from "../model/misc";

interface IErrors {
  name: string;
  link: string;
}

const initialErrors: IErrors = {
  name: "",
  link: "",
};

interface IUseCamerasStore extends IStoreStatus {
  cameras: ICamera[];
  errors: IErrors;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  refreshErrors: () => void;
  fetchCameras: () => void;
  validate: (name: string, link: string) => boolean;
  addCamera: (name: string, link: string) => void;
  editCamera: (camera: ICamera, onEdit: (camera: null) => void) => void;
  deleteCamera: (camera: ICamera) => void;
  recoverCamera: (cameraId: string) => void;
  deleteHistory: (cameraId: string) => void;
  deleteDefect: (cameraId: string, defectId: string) => void;
  recoverDefect: (cameraId: string, defectId: string) => void;
  clearTrashBin: () => void;
  clearTrashBinByDates: (startDate: Date | null, endDate: Date | null) => void;
}

const useCamerasStore = create<IUseCamerasStore>((set, get) => ({
  loading: false,
  error: null,
  cameras: [...initialCameras],
  errors: { ...initialErrors },

  fetchCameras: () => {
    try {
      set({ loading: true, error: null });
      const cameras = [...initialCameras];
      set({
        cameras,
        loading: false,
        error: false,
      });
    } catch (error) {
      showErrorToast("Не удалось загрузить список камер");
      console.error(error);
      set({ error, loading: false });
    }
  },

  setErrorsField: (field, error) =>
    set((state) => ({ errors: { ...state.errors, [field]: error } })),

  validate: (name, link) => {
    const newErrors: IErrors = {
      name: !name.trim() ? EErrors.required : "",
      link: !link.trim()
        ? EErrors.required
        : !linkPattern.test(link.trim())
        ? EErrors.link
        : "",
    };

    set({ errors: newErrors });
    return Object.values(newErrors).every((error) => !error);
  },

  addCamera: (name, link) => {
    const { validate, cameras } = get();

    if (validate(name, link)) {
      const newCamera: ICamera = {
        id: uuid.v4(),
        online: true,
        title: name.trim(),
        uptime: "0д 0ч 0м",
        defects: [],
        link: link.trim(),
      };

      try {
        set({
          loading: true,
          cameras: [...cameras, newCamera],
        });
        showSuccessToast(`Камера "${name}" успешно добавлена`);
      } catch (error) {
        console.log(error);
        showErrorToast("Произошла ошибка при добавлении камеры");
      } finally {
        set({ loading: false });
      }
    } else {
      showErrorToast(EErrors.fields);
    }
  },

  editCamera: (camera, onEdit) => {
    const { validate, cameras } = get();
    const oldCamera = cameras.find((c) => c.id === camera.id);
    const newCamera: ICamera = {
      ...camera,
      title: camera.title.trim(),
      link: camera.link.trim(),
    };

    if (JSON.stringify(oldCamera) !== JSON.stringify(newCamera)) {
      if (validate(newCamera.title, newCamera.link)) {
        try {
          set({
            loading: true,
            cameras: cameras.map((c) =>
              c.id === newCamera.id ? newCamera : c
            ),
          });
          onEdit(null);
          showSuccessToast("Данные камеры успешно отредактированы");
        } catch (error) {
          console.log(error);
          showErrorToast("Произошла ошибка при редактировании камеры");
        } finally {
          set({ loading: false });
        }
      } else {
        showErrorToast(EErrors.fields);
      }
    } else {
      showInfoToast(EErrors.noChanges);
    }
  },

  deleteCamera: (camera) => {
    const { cameras } = get();
    const now = new Date().toISOString();

    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((c) =>
          c.id === camera.id ? { ...c, deletedAt: now } : c
        ),
        errors: { ...initialErrors },
        loading: false,
        error: false,
      });
      showSuccessToast(`Камера "${camera.title}" успешно перемещена в корзину`);
    } catch (error) {
      showErrorToast("Не удалось удалить камеру");
      console.error(error);
      set({ error, loading: false });
    }
  },

  recoverCamera: (cameraId: string) => {
    const { cameras } = get();
    set({
      cameras: cameras.map((c) =>
        c.id === cameraId ? { ...c, deletedAt: undefined } : c
      ),
    });
    showSuccessToast("Камера восстановлена");
  },

  deleteHistory: (id) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((camera: ICamera) =>
          camera.id === id
            ? { ...camera, defects: camera.defects.filter((d) => d.deletedAt) }
            : camera
        ),
        errors: { ...initialErrors },
        loading: false,
        error: false,
      });
      showSuccessToast(`История камеры успешно удалена`);
    } catch (error) {
      showErrorToast("Не удалось удалить историю камеры");
      console.error(error);
      set({ error, loading: false });
    }
  },

  deleteDefect: (cameraId, defectId) => {
    const { cameras } = get();
    const now = new Date().toISOString();

    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((c) =>
          c.id === cameraId
            ? {
                ...c,
                defects: c.defects.map((d) =>
                  d.id === defectId ? { ...d, deletedAt: now } : d
                ),
              }
            : c
        ),
        loading: false,
        error: false,
      });
      showSuccessToast("Дефект перемещен в корзину");
    } catch (error) {
      showErrorToast("Не удалось удалить дефект");
      console.error(error);
      set({ error, loading: false });
    }
  },

  recoverDefect: (cameraId, defectId) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((c) =>
          c.id === cameraId
            ? {
                ...c,
                defects: c.defects.map((d) =>
                  d.id === defectId ? { ...d, deletedAt: undefined } : d
                ),
              }
            : c
        ),
        loading: false,
        error: false,
      });
      showSuccessToast("Дефект восстановлен");
    } catch (error) {
      showErrorToast("Не удалось восстановить дефект");
      console.error(error);
      set({ error, loading: false });
    }
  },

  clearTrashBin: () => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((c) => ({
          ...c,
          defects: c.defects.filter((d) => !d.deletedAt),
        })),
        loading: false,
        error: false,
      });
      showSuccessToast("Корзина очищена");
    } catch (error) {
      showErrorToast("Не удалось очистить корзину");
      console.error(error);
      set({ error, loading: false });
    }
  },

  clearTrashBinByDates: (startDate, endDate) => {
    const { cameras } = get();

    if (!startDate || !endDate) {
      showErrorToast(EErrors.chooseDates);
      return;
    }

    if (startDate > endDate) {
      showErrorToast(EErrors.timeDates);
      return;
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    try {
      set({ loading: true, error: null });

      let foundSomething = false;

      const updatedCameras = cameras.map((camera) => ({
        ...camera,
        defects: camera.defects.filter((defect) => {
          if (!defect.deletedAt) return true;

          const defectDate = new Date(defect.date);
          const shouldDelete = defectDate >= start && defectDate <= end;

          if (shouldDelete) {
            foundSomething = true;
            return false;
          }

          return true;
        }),
      }));

      if (!foundSomething) {
        showInfoToast("За выбранный период дефекты не найдены");
        set({ loading: false });
        return;
      }

      set({
        cameras: updatedCameras,
        loading: false,
        error: false,
      });

      showSuccessToast("Корзина за данный промежуток очищена");
    } catch (error) {
      showErrorToast("Не удалось очистить корзину за данный промежуток");
      console.error(error);
      set({ error, loading: false });
    }
  },

  refreshErrors: () => {
    set({ errors: { ...initialErrors } });
  },
}));

export default useCamerasStore;
