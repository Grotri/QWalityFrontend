import { fontSizes } from "@/src/constants/fontSizes";
import { themes } from "@/src/constants/themes";
import React, { Fragment, useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { ArrowBottomIcon } from "../../../../assets/icons";
import { EErrors } from "../../../constants/errors";
import { settingsItems } from "../../../constants/settingsItems";
import { showErrorToast } from "../../../helpers/toast";
import useAccountStore from "../../../hooks/useAccountStore";
import useAuthStore from "../../../hooks/useAuthStore";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import Dropdown from "../../atoms/Dropdown";
import Input from "../../atoms/Input";
import Modal from "../../atoms/Modal";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";

const Settings = () => {
  const { navigate } = useMainNavigation();
  const { user, setUserField, logout } = useAuthStore();
  const { clearAccounts } = useAccountStore();
  const styles = getStyles();

  const [isFirstDDOpen, setIsFirstDDOpen] = useState<boolean>(false);
  const [isAutoDelete, setIsAutoDelete] = useState<string>("No");
  const [isSecondDDOpen, setIsSecondDDOpen] = useState<boolean>(false);
  const [isThemeDDOpen, setIsThemeDDOpen] = useState<boolean>(false);
  const [isFontsDDOpen, setIsFontsDDOpen] = useState<boolean>(false);
  const [isAutoClear, setIsAutoClear] = useState<string>("No");
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const toggleTheme = (value: string) => {
    setUserField("theme", value);
  };

  const toggleFontSize = (value: string) => {
    setUserField("fontSize", value);
  };

  const closeDD = () => {
    if (isFirstDDOpen) {
      setIsFirstDDOpen(false);
    }
    if (isSecondDDOpen) {
      setIsSecondDDOpen(false);
    }
    if (isThemeDDOpen) {
      setIsThemeDDOpen(false);
    }
    if (isFontsDDOpen) {
      setIsFontsDDOpen(false);
    }
  };

  const deleteAccount = () => {
    if (!code.trim()) {
      setError(EErrors.required);
      showErrorToast("Сначала введите код");
    } else {
      logout(clearAccounts);
    }
  };

  useEffect(() => {
    if (isFirstDDOpen) {
      setIsSecondDDOpen(false);
      setIsThemeDDOpen(false);
      setIsFontsDDOpen(false);
    } else if (isSecondDDOpen) {
      setIsFirstDDOpen(false);
      setIsThemeDDOpen(false);
      setIsFontsDDOpen(false);
    } else if (isThemeDDOpen) {
      setIsFirstDDOpen(false);
      setIsSecondDDOpen(false);
      setIsFontsDDOpen(false);
    } else if (isFontsDDOpen) {
      setIsFirstDDOpen(false);
      setIsSecondDDOpen(false);
      setIsThemeDDOpen(false);
    }
  }, [isFirstDDOpen, isSecondDDOpen, isThemeDDOpen]);

  useEffect(() => {
    if (!isDeleteModalOpen) {
      setCode("");
      setError("");
    }
  }, [isDeleteModalOpen]);

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
        {user.role !== "user" && (
          <Fragment>
            <View style={styles.dropdownWrapper}>
              <Text style={styles.dropdownText}>Авто-удаление дефектов</Text>
              <Dropdown
                data={settingsItems}
                setValue={setIsAutoDelete}
                value={isAutoDelete}
                setIsOpen={setIsFirstDDOpen}
                isOpen={isFirstDDOpen}
                wrapperStyle={[styles.wrapperStyle, { zIndex: 4 }]}
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
                wrapperStyle={[styles.wrapperStyle, { zIndex: 3 }]}
                dropdownStyle={styles.dropdownStyle}
                arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
              />
            </View>
            <View style={styles.dropdownWrapper}>
              <Text style={styles.dropdownText}>Тема</Text>
              <Dropdown
                data={themes}
                setValue={toggleTheme}
                value={user.theme}
                setIsOpen={setIsThemeDDOpen}
                isOpen={isThemeDDOpen}
                wrapperStyle={[styles.wrapperStyle, { zIndex: 2 }]}
                dropdownStyle={styles.dropdownStyle}
                arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
              />
            </View>
            <View style={styles.dropdownWrapper}>
              <Text style={styles.dropdownText}>Размер шрифта</Text>
              <Dropdown
                data={fontSizes}
                setValue={toggleFontSize}
                value={user.fontSize}
                setIsOpen={setIsFontsDDOpen}
                isOpen={isFontsDDOpen}
                wrapperStyle={styles.wrapperStyle}
                dropdownStyle={styles.dropdownStyle}
                arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
              />
            </View>
          </Fragment>
        )}
        <Button
          style={[styles.btn, { marginTop: 22, marginBottom: 16 }]}
          color="blue"
          onPress={() => setIsExitModalOpen(true)}
        >
          <Text style={styles.btnText}>Выйти из аккаунта</Text>
        </Button>
        {user.role === "owner" && (
          <Button
            style={[styles.btn, { marginBottom: 8 }]}
            color="red"
            onPress={() => setIsDeleteModalOpen(true)}
          >
            <Text style={styles.btnText}>Удалить аккаунт</Text>
          </Button>
        )}
        <Text style={styles.version}>QWality Release v1.0.0</Text>
      </View>
      <Modal isVisible={isExitModalOpen} setIsVisible={setIsExitModalOpen}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Вы точно хотите выйти?</Text>
          <View style={styles.modalBtns}>
            <Button
              style={styles.modalBtn}
              color="blue"
              onPress={() => logout(clearAccounts)}
            >
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
              onChangeText={(code) => {
                setCode(code);
                setError("");
              }}
              customStyles={styles.customStyles}
              customInputStyles={styles.customInputStyles}
              customLabelStyles={styles.customLabelStyles}
              errorText={error}
              maxLength={6}
            />
            <Button style={styles.codeBtn} color="blue">
              <Text style={styles.modalBtnCodeText}>Отправить код</Text>
            </Button>
          </View>
          <View style={styles.modalBtns}>
            <Button style={styles.modalBtn} color="red" onPress={deleteAccount}>
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
