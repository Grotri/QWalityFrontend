import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import PageTemplate from "../../templates/PageTemplate";
import { palette } from "../../../constants/palette";
import { ArrowBottomIcon } from "../../../../assets/icons";
import Input from "../../atoms/Input";
import Dropdown from "../../atoms/Dropdown";
import Button from "../../atoms/Button";
import { roles } from "../../../constants/roles";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { emailPattern } from "../../../constants/patterns";
import { showErrorToast } from "../../../helpers/toast";
import useAccountStore from "../../../hooks/useAccountStore";
import { IAccount } from "../../../constants/account";
import uuid from "react-native-uuid";
import Slider from "../../atoms/Slider";
import GetReportModal from "../../organisms/GetReportModal";

const Admin = () => {
  const { navigate } = useMainNavigation();
  const { addAccount } = useAccountStore();
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [role, setRole] = useState<string>("0");
  const [isMainModalOpened, setIsMainModalOpened] = useState<boolean>(false);
  const [isRoleDdOpen, setIsRoleDdOpen] = useState<boolean>(false);

  const closeDropdowns = () => {
    if (isRoleDdOpen) {
      setIsRoleDdOpen(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: IErrors = {
      name: !name.trim() ? EErrors.required : "",
      login: !login.trim()
        ? EErrors.required
        : !emailPattern.test(login.trim())
        ? "Введите корректный email"
        : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? "Пароль должен содержать не менее 8 символов"
        : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const createSubAccount = () => {
    const account: IAccount = {
      id: uuid.v4(),
      name,
      login,
      password,
      role,
    };
    if (validate()) {
      addAccount(account);
      setLogin("");
      setPassword("");
      setName("");
    } else {
      showErrorToast("Сначала заполните поля формы");
    }
  };

  return (
    <PageTemplate
      mustScroll={false}
      onTouchablePress={closeDropdowns}
      headerText="Админ панель"
      underlined
      onHeaderClick={() => navigate("Profile", { direction: "backward" })}
      isWholeBlurOn={isMainModalOpened}
    >
      <View>
        <View style={styles.adminWrapper}>
          <Text style={styles.subTitle}>Уверенность нейросети</Text>
          <Slider />
          <Text style={styles.subTitle}>Регистрация суб-аккаунта</Text>
          <Input
            label="Имя пользователя"
            value={name}
            onChangeText={(name) => {
              setName(name);
              setErrors({ ...errors, name: "" });
            }}
            errorText={errors.name}
            maxLength={254}
            cursorColor={palette.subTextMainScreenPopup}
            customStyles={styles.confirmationInputWrapper}
            customInputStyles={styles.confirmationInput}
            customLabelStyles={styles.confirmationInputLabel}
          />
          <Input
            label="Логин"
            value={login}
            onChangeText={(login) => {
              setLogin(login);
              setErrors({ ...errors, login: "" });
            }}
            errorText={errors.login}
            inputMode="email"
            maxLength={254}
            cursorColor={palette.subTextMainScreenPopup}
            customStyles={styles.confirmationInputWrapper}
            customInputStyles={styles.confirmationInput}
            customLabelStyles={styles.confirmationInputLabel}
          />
          <Input
            label="Пароль"
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              setErrors({ ...errors, password: "" });
            }}
            errorText={errors.password}
            secureTextEntry
            cursorColor={palette.subTextMainScreenPopup}
            customStyles={styles.confirmationInputWrapper}
            customInputStyles={styles.confirmationInput}
            customLabelStyles={styles.confirmationInputLabel}
          />
          <Dropdown
            data={roles.map((role) => ({
              value: role.id,
              label: role.name,
            }))}
            value={role}
            setValue={setRole}
            label="Роль"
            wrapperStyle={styles.dropdownWrapper}
            labelStyle={styles.dropdownLabelStyle}
            dropdownStyle={styles.dropdownMainStyle}
            selectedTextStyle={styles.selectedMainTextStyle}
            isOpen={isRoleDdOpen}
            setIsOpen={setIsRoleDdOpen}
            arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
          />
          <Button color="blue" style={styles.btn} onPress={createSubAccount}>
            <Text style={styles.btnText}>Создать суб-аккаунт</Text>
          </Button>
          <Button
            color="blue"
            style={styles.btn}
            onPress={() => setIsMainModalOpened(true)}
          >
            <Text style={styles.btnText}>Получить отчет</Text>
          </Button>
          <Button
            color="blue"
            style={styles.btn}
            onPress={() => navigate("AccountManagement")}
          >
            <Text style={styles.btnText}>Управлять аккаунтами</Text>
          </Button>
          <Text style={styles.statistics}>3/15 аккаунтов</Text>
        </View>
        <GetReportModal
          isOpen={isMainModalOpened}
          setIsOpen={setIsMainModalOpened}
        />
      </View>
    </PageTemplate>
  );
};

export default Admin;
