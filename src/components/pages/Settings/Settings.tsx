import React, { useEffect, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { Keyboard, Text, View } from "react-native";
import { styles } from "./styles";
import Dropdown from "../../atoms/Dropdown";
import { settingsItems } from "./types";
import { ArrowBottomIcon } from "../../../../assets/icons";
import Button from "../../atoms/Button";
import Modal from "../../atoms/Modal";
import useAuthStore from "../../../hooks/useAuthStore";
import Input from "../../atoms/Input";

const Settings = () => {
  const { navigate } = useMainNavigation();
  const { logout } = useAuthStore();

  const [isFirstDDOpen, setIsFirstDDOpen] = useState<boolean>(false);
  const [isAutoDelete, setIsAutoDelete] = useState<string>("No");
  const [isSecondDDOpen, setIsSecondDDOpen] = useState<boolean>(false);
  const [isAutoClear, setIsAutoClear] = useState<string>("No");
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const closeDD = () => {
    if (isFirstDDOpen) {
      setIsFirstDDOpen(false);
    }
    if (isSecondDDOpen) {
      setIsSecondDDOpen(false);
    }
  };

  useEffect(() => {
    if (isFirstDDOpen && isSecondDDOpen) {
      setIsSecondDDOpen(false);
    }
  }, [isFirstDDOpen]);

  return (
    <PageTemplate
      headerText="Настройки"
      underlined
      onHeaderClick={() => navigate("Main", { direction: "backward" })}
      mustScroll={false}
      onTouchablePress={closeDD}
      isWholeBlurOn={isExitModalOpen || isDeleteModalOpen}
    >
      <View style={styles.wrapper}>
        <View style={styles.dropdownWrapper}>
          <Text style={styles.dropdownText}>Авто-удаление дефектов</Text>
          <Dropdown
            data={settingsItems}
            setValue={setIsAutoDelete}
            value={isAutoDelete}
            setIsOpen={setIsFirstDDOpen}
            isOpen={isFirstDDOpen}
            wrapperStyle={[styles.wrapperStyle, { zIndex: 2 }]}
            dropdownStyle={styles.dropdownStyle}
            arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
          />
        </View>
        <View style={styles.dropdownWrapper}>
          <Text style={styles.dropdownText}>Авто-чистка корзины</Text>
          <Dropdown
            data={settingsItems}
            setValue={setIsAutoClear}
            value={isAutoClear}
            setIsOpen={setIsSecondDDOpen}
            isOpen={isSecondDDOpen}
            wrapperStyle={styles.wrapperStyle}
            dropdownStyle={styles.dropdownStyle}
            arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
          />
        </View>
        <Button
          style={[styles.btn, { marginTop: 22, marginBottom: 16 }]}
          color="blue"
          onPress={() => setIsExitModalOpen(true)}
        >
          <Text style={styles.btnText}>Выйти из аккаунта</Text>
        </Button>
        <Button
          style={[styles.btn, { marginBottom: 8 }]}
          color="red"
          onPress={() => setIsDeleteModalOpen(true)}
        >
          <Text style={styles.btnText}>Удалить аккаунт</Text>
        </Button>
        <Text style={styles.version}>QWality Release v1.0.0</Text>
      </View>
      <Modal isVisible={isExitModalOpen} setIsVisible={setIsExitModalOpen}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Вы точно хотите выйти?</Text>
          <View style={styles.modalBtns}>
            <Button style={styles.modalBtn} color="blue" onPress={logout}>
              <Text style={styles.modalBtnText}>Да</Text>
            </Button>
            <Button
              style={styles.modalBtn}
              color="blue"
              onPress={() => setIsExitModalOpen(false)}
            >
              <Text style={styles.modalBtnText}>Нет</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={isDeleteModalOpen}
        setIsVisible={setIsDeleteModalOpen}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>Удалить аккаунт?</Text>
          <View style={styles.confirmationWrapper}>
            <Input
              keyboardType="numeric"
              inputMode="numeric"
              label="Код подтверждения"
              value={code}
              onChangeText={setCode}
              customInputStyles={styles.customInputStyles}
              customLabelStyles={styles.customLabelStyles}
            />
            <Button style={styles.modalBtn} color="blue">
              <Text style={styles.modalBtnCodeText}>Отправить код</Text>
            </Button>
          </View>
          <View style={styles.modalBtns}>
            <Button style={styles.modalBtn} color="red" onPress={logout}>
              <Text style={styles.modalBtnText}>Удалить</Text>
            </Button>
            <Button
              style={styles.modalBtn}
              color="blue"
              onPress={() => setIsDeleteModalOpen(false)}
            >
              <Text style={styles.modalBtnText}>Отменить</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </PageTemplate>
  );
};

export default Settings;
