import React, { FC } from "react";
import { IAddCameraModal } from "./types";
import { Text, View } from "react-native";
import Modal from "../../atoms/Modal";
import { styles } from "./styles";
import { CrossIcon } from "../../../../assets/icons";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const AddCameraModal: FC<IAddCameraModal> = ({ isOpen, setIsOpen }) => {
  return (
    <View style={styles.wrapper}>
      <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
        <View style={styles.modal}>
          <View style={styles.crossIconWrapper}>
            <CrossIcon
              style={styles.crossIcon}
              onClick={() => setIsOpen(false)}
            />
            <Text style={styles.modalTitle}>Добавить камеру</Text>
          </View>
          <Input
            label="Название"
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
          />
          <Input
            label="Ссылка на камеру"
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
          />
          <Button style={styles.btn} color="modal">
            <Text style={styles.btnText}>Добавить</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default AddCameraModal;
