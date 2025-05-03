import React, { useState } from "react";
import { Text, View } from "react-native";
import { getStyles } from "./styles";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import PageTemplate from "../../templates/PageTemplate";
import { ArrowBottomIcon } from "../../../../assets/icons";
import Input from "../../atoms/Input";
import Dropdown from "../../atoms/Dropdown";
import Button from "../../atoms/Button";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import uuid from "react-native-uuid";
import useAccountStore from "../../../hooks/useAccountStore";
import Slider from "../../atoms/Slider";
import GetReportModal from "../../organisms/GetReportModal";
import InputPassword from "../../atoms/InputPassword";
import { screenHeight } from "../../../constants/screenSize";
import { useAvailableRoles } from "../../../helpers/useAvailableRoles";
import { useAccountLimits } from "../../../helpers/useAccountLimits";
import { IUser } from "../../../model/user";
import { showErrorToast } from "../../../helpers/toast";
import { ERoles } from "../../../constants/roles";
import useAuthStore from "../../../hooks/useAuthStore";
import { usePalette } from "../../../hooks/usePalette";

const Admin = () => {
  const { navigate } = useMainNavigation();
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);
  const palette = usePalette();
  const { accounts, registerAccount } = useAccountStore();
  const availableRoles = useAvailableRoles();
  const accountLimits = useAccountLimits();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [role, setRole] = useState<string>("user");
  const [isMainModalOpened, setIsMainModalOpened] = useState<boolean>(false);
  const [isRoleDdOpen, setIsRoleDdOpen] = useState<boolean>(false);

  const closeDropdowns = () => {
    if (isRoleDdOpen) {
      setIsRoleDdOpen(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: IErrors = {
      login: !login.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const createSubAccount = () => {
    if (accounts.length < accountLimits) {
      const account: IUser = {
        id: uuid.v4(),
        login: login.trim(),
        password: password.trim(),
        role,
        theme: "dark",
      };
      if (validate()) {
        registerAccount(account);
        setLogin("");
        setPassword("");
      } else {
        showErrorToast(EErrors.fields);
      }
    } else {
      showErrorToast("Достигнут лимит аккаунтов");
    }
  };

  return (
    <PageTemplate
      mustScroll={screenHeight < 740}
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
          <InputPassword
            label="Пароль"
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              setErrors({ ...errors, password: "" });
            }}
            errorText={errors.password}
            cursorColor={palette.subTextMainScreenPopup}
            customStyles={styles.confirmationInputWrapper}
            customInputStyles={styles.confirmationInput}
            customLabelStyles={styles.confirmationInputLabel}
            iconColor={palette.mainText}
          />
          <Dropdown
            data={availableRoles.map((key) => ({
              value: key,
              label: ERoles[key as keyof typeof ERoles],
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
          <Text style={styles.statistics}>
            {accounts.length}/{accountLimits} аккаунтов
          </Text>
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
