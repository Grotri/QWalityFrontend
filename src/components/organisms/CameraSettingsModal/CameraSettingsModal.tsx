import React, { FC, useEffect, useState } from "react";
import { ICameraSettingsModal } from "./types";
import { Text, View } from "react-native";
import Modal from "../../atoms/Modal";
import { styles } from "./styles";
import { CrossIcon } from "../../../../assets/icons";
import Input from "../../atoms/Input";
import Radio from "../../atoms/Radio";
import Button from "../../atoms/Button";
import { ICamera } from "../../pages/Main/types";
import { initialCamera } from "../../../constants/cameras";
import { palette } from "../../../constants/palette";

const CameraSettingsModal: FC<ICameraSettingsModal> = ({
  camera,
  setCamera,
  isHistoryModalOpen,
  setIsHistoryModalOpen,
}) => {
  const [cameraInfo, setCameraInfo] = useState<ICamera>({ ...initialCamera });
  const { title, link, online } = cameraInfo;

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const openCameraModal = () => {
    setIsHistoryModalOpen(false);
  };

  const closeModal = () => {
    setCamera(null);
    setIsHistoryModalOpen(null);
  };

  useEffect(() => {
    if (camera) {
      setCameraInfo(camera);
    }
  }, [camera]);

  return (
    <Modal isVisible={!!camera} onBackdropPress={closeModal}>
      <View style={styles.modals}>
        <View style={styles.modal}>
          <View style={styles.crossIconWrapper}>
            <CrossIcon style={styles.crossIcon} onClick={closeModal} />
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <Input
            label="Ссылка на камеру"
            value={link}
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
            cursorColor={palette.subTextMainScreenPopup}
          />
          <View style={styles.stateWrapper}>
            <Text style={styles.stateText}>Состояние</Text>
            <View style={styles.stateRadios}>
              <Radio
                label="Online"
                labelStyle={styles.radioLabelStyle}
                radioWrapperStyle={styles.radioWrapperStyle}
                isChecked={online}
              />
              <Radio
                label="Offline"
                labelStyle={styles.radioLabelStyle}
                radioWrapperStyle={styles.radioWrapperStyle}
                isChecked={!online}
              />
            </View>
          </View>
          <View style={styles.btns}>
            <View style={styles.flexBtns}>
              <Button style={styles.btn} color="red" onPress={openHistoryModal}>
                <Text style={styles.btnText}>Удалить историю</Text>
              </Button>
              <Button style={styles.btn} color="red" onPress={openCameraModal}>
                <Text style={styles.btnText}>Удалить камеру</Text>
              </Button>
            </View>
            <Button style={styles.fullBtn} color="modal" onPress={closeModal}>
              <Text style={styles.fullBtnText}>Сохранить</Text>
            </Button>
          </View>
        </View>
        {isHistoryModalOpen !== null && (
          <View style={styles.modal}>
            <Text style={styles.smallModalTitle}>
              Вы точно хотите удалить{" "}
              {isHistoryModalOpen ? "историю" : "камеру"}?
            </Text>
            <View style={styles.smallModalBtns}>
              <Button style={styles.btn} color="red" onPress={closeModal}>
                <Text style={styles.btnBolderText}>Да</Text>
              </Button>
              <Button
                style={styles.btn}
                color="modal"
                onPress={() => setIsHistoryModalOpen(null)}
              >
                <Text style={styles.btnBolderText}>Нет</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CameraSettingsModal;
