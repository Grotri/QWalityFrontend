import React, { FC, useEffect, useState } from "react";
import { IDefectSaveModal } from "./types";
import Modal from "../../atoms/Modal";
import { Text, View } from "react-native";
import { getStyles } from "./styles";
import { IDefect } from "../../pages/Main/types";
import { initialDefect } from "../../../model/defect";
import Button from "../../atoms/Button";
import { showSuccessToast } from "../../../helpers/toast";
import { convertISODate } from "../../../helpers/formatDate";
import useAuthStore from "../../../hooks/useAuthStore";

const DefectSaveModal: FC<IDefectSaveModal> = ({ onClose, defect }) => {
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);
  const [defectInfo, setDefectInfo] = useState<IDefect>({ ...initialDefect });
  const { name, date } = defectInfo;

  useEffect(() => {
    if (defect) {
      setDefectInfo({ ...defect });
    }
  }, [defect]);

  return (
    <Modal isVisible={!!defect} onBackdropPress={onClose}>
      <View style={styles.modal}>
        <View style={styles.mainInfo}>
          <Text style={styles.title}>Хотите скачать изображение?</Text>
          <Text style={styles.name}>
            Дефект ({name}) {convertISODate(date)}
          </Text>
        </View>
        <View style={styles.btns}>
          <Button
            color="modal"
            style={styles.btn}
            onPress={() => {
              onClose();
              showSuccessToast("Изображение скачано");
            }}
          >
            <Text style={styles.btnText}>Да</Text>
          </Button>
          <Button color="modal" style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>Нет</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default DefectSaveModal;
