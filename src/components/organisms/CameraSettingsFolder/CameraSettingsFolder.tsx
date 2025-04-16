import React, { FC, useEffect, useState } from "react";
import { ICameraSettingsFolder } from "./types";
import { Text, View } from "react-native";
import Modal from "../../atoms/Modal";
import { styles } from "./styles";
import { CrossIcon } from "../../../../assets/icons";
import Input from "../../atoms/Input";
import Radio from "../../atoms/Radio";
import Button from "../../atoms/Button";
import { ICamera } from "../../pages/Main/types";
import { initialCamera } from "../../../constants/cameras";

const CameraSettingsFolder: FC<ICameraSettingsFolder> = ({
  isOpen,
  setIsOpen,
  camera,
}) => {
  const [cameraInfo, setCameraInfo] = useState<ICamera>({ ...initialCamera });
  const { title, link, online } = cameraInfo;

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
    if (isCameraModalOpen) {
      setIsCameraModalOpen(false);
    }
  };

  const openCameraModal = () => {
    setIsCameraModalOpen(true);
    if (isHistoryModalOpen) {
      setIsHistoryModalOpen(false);
    }
  };

  useEffect(() => {
    if (camera) {
      setCameraInfo(camera);
    }
  }, [camera]);

  return (
    <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
      <View style={styles.modals}>
        <View style={styles.modal}>
          <View style={styles.crossIconWrapper}>
            <CrossIcon
              style={styles.crossIcon}
              onClick={() => setIsOpen(false)}
            />
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <Input
            label="Ссылка на камеру"
            value={link}
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
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
            <Button
              style={styles.fullBtn}
              color="modal"
              onPress={() => setIsOpen(false)}
            >
              <Text style={styles.fullBtnText}>Сохранить</Text>
            </Button>
          </View>
        </View>
        {isHistoryModalOpen && (
          <View style={styles.modal}>
            <Text style={styles.smallModalTitle}>
              Вы точно хотите удалить историю?
            </Text>
            <View style={styles.smallModalBtns}>
              <Button
                style={styles.btn}
                color="red"
                onPress={() => setIsOpen(false)}
              >
                <Text style={styles.btnText}>Да</Text>
              </Button>
              <Button
                style={styles.btn}
                color="modal"
                onPress={() => setIsHistoryModalOpen(false)}
              >
                <Text style={styles.btnText}>Нет</Text>
              </Button>
            </View>
          </View>
        )}
        {isCameraModalOpen && (
          <View style={styles.modal}>
            <Text style={styles.smallModalTitle}>
              Вы точно хотите удалить камеру?
            </Text>
            <View style={styles.smallModalBtns}>
              <Button
                style={styles.btn}
                color="red"
                onPress={() => setIsOpen(false)}
              >
                <Text style={styles.btnText}>Да</Text>
              </Button>
              <Button
                style={styles.btn}
                color="modal"
                onPress={() => setIsCameraModalOpen(false)}
              >
                <Text style={styles.btnText}>Нет</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CameraSettingsFolder;
