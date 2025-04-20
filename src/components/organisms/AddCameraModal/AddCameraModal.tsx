import React, { FC, useEffect, useState } from "react";
import { IAddCameraModal } from "./types";
import { Text, View } from "react-native";
import Modal from "../../atoms/Modal";
import { styles } from "./styles";
import { CrossIcon } from "../../../../assets/icons";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { palette } from "../../../constants/palette";
import useCamerasStore from "../../../hooks/useCamerasStore";

const AddCameraModal: FC<IAddCameraModal> = ({ isOpen, setIsOpen }) => {
  const { addCamera, errors, setErrorsField, refreshErrors } =
    useCamerasStore();
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      refreshErrors();
      setName("");
      setLink("");
    }
  }, [isOpen]);

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
            value={name}
            onChangeText={(name) => {
              setName(name);
              setErrorsField("name", "");
            }}
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
            cursorColor={palette.subTextMainScreenPopup}
            errorText={errors.name}
            maxLength={20}
          />
          <Input
            label="Ссылка на камеру"
            value={link}
            onChangeText={(link) => {
              setLink(link);
              setErrorsField("link", "");
            }}
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
            cursorColor={palette.subTextMainScreenPopup}
            errorText={errors.link}
          />
          <Button
            style={styles.btn}
            color="modal"
            onPress={() => addCamera(name, link)}
          >
            <Text style={styles.btnText}>Добавить</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default AddCameraModal;
