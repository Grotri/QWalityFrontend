import React, { useEffect, useState } from "react";
import { Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import {
  ArrowBottomIcon,
  ArrowTopIcon,
  ProfileIconSmall,
} from "../../../../assets/icons";
import { ERoles } from "../../../constants/roles";
import { useAvailableRoles } from "../../../helpers/useAvailableRoles";
import useAccountStore from "../../../hooks/useAccountStore";
import useAuthStore from "../../../hooks/useAuthStore";
import { usePalette } from "../../../hooks/usePalette";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { IUser } from "../../../model/user";
import Button from "../../atoms/Button";
import Dropdown from "../../atoms/Dropdown";
import IconRotated from "../../atoms/IconRotated";
import Input from "../../atoms/Input";
import InputPassword from "../../atoms/InputPassword";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";

const AccountManagement = () => {
  const { navigate } = useMainNavigation();
  const { user } = useAuthStore();
  const styles = getStyles(user.fontSize);
  const palette = usePalette();
  const {
    accounts,
    changeAccount,
    deleteAccount,
    errors,
    changeError,
    refreshErrors,
  } = useAccountStore();
  const availableRoles = useAvailableRoles();
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [sections, setSections] = useState<IUser[]>([...accounts]);
  const [isDdOpen, setIsDdOpen] = useState<boolean>(false);

  const handleSectionChange = (sections: number[]) => {
    setActiveSections(sections);
  };

  const changeAccountField = (
    id: string,
    field: keyof IUser,
    value: string
  ) => {
    setSections(
      sections.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  const closeDd = () => {
    if (isDdOpen) {
      setIsDdOpen(false);
    }
  };

  useEffect(() => {
    closeDd();
  }, [activeSections]);

  useEffect(() => {
    const filteredAccounts = accounts.filter((acc) =>
      availableRoles.includes(acc.role)
    );
    setSections([...filteredAccounts]);
  }, [accounts, user.role]);

  useEffect(() => {
    refreshErrors();
  }, [refreshErrors]);

  const renderHeader = (section: IUser, index: number) => {
    const initialUser = accounts.find((account) => account.id === section.id);

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ProfileIconSmall />
          <Text style={styles.headerText}>{initialUser?.login}</Text>
        </View>
        <IconRotated
          icon={<ArrowTopIcon style={{ transform: [{ scaleY: -1 }] }} />}
          isActive={activeSections.includes(index)}
        />
      </View>
    );
  };

  const renderContent = (section: IUser) => {
    const index = accounts.findIndex((acc) => acc.id === section.id);
    const error = errors[index] || { login: "", password: "" };

    return (
      <View style={styles.content}>
        <Input
          label="Логин"
          value={section.login}
          onChangeText={(login) => {
            changeAccountField(section.id, "login", login);
            changeError(index, "login", "");
          }}
          customInputStyles={styles.input}
          customInputWrapperStyles={styles.inputWrapperStyles}
          customLabelStyles={styles.inputLabel}
          errorStyles={styles.errorStyles}
          cursorColor={palette.subTextMainScreenPopup}
          errorText={error.login}
        />
        <InputPassword
          label="Пароль"
          value={section.password}
          onChangeText={(password) => {
            changeAccountField(section.id, "password", password);
            changeError(index, "password", "");
          }}
          customInputStyles={styles.input}
          customInputWrapperStyles={styles.inputWrapperStyles}
          customLabelStyles={styles.inputLabel}
          errorStyles={styles.errorStyles}
          cursorColor={palette.subTextMainScreenPopup}
          errorText={error.password}
          iconColor={palette.mainText}
          iconSize={18}
        />
        <Dropdown
          data={availableRoles.map((key) => ({
            value: key,
            label: ERoles[key as keyof typeof ERoles],
          }))}
          value={section.role}
          setValue={(role) => changeAccountField(section.id, "role", role)}
          isOpen={isDdOpen}
          setIsOpen={setIsDdOpen}
          label="Роль"
          wrapperStyle={[
            styles.dropdownWrapper,
            { marginBottom: isDdOpen ? 140 : 36 },
          ]}
          labelStyle={styles.inputLabel}
          dropdownStyle={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          itemContainerStyle={styles.itemContainerStyle}
          borderColor={palette.textFieldInFolderBg}
          arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
        />
        <View style={styles.btns}>
          <Button
            color="management"
            style={styles.btn}
            onPress={() =>
              changeAccount(index, {
                ...section,
                login: section.login.trim(),
                password: section.password.trim(),
              })
            }
          >
            <Text style={styles.btnText}>Изменить</Text>
          </Button>
          <Button
            color="red"
            style={styles.btn}
            onPress={() => {
              deleteAccount(index);
              setActiveSections([]);
            }}
          >
            <Text style={styles.btnText}>Удалить</Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    <PageTemplate
      headerText="Управление аккаунтами"
      onHeaderClick={() => navigate("Admin", { direction: "backward" })}
    >
      <TouchableWithoutFeedback onPress={closeDd}>
        <View style={styles.managerWrapper}>
          {sections.length > 0 ? (
            <Accordion
              containerStyle={styles.accordion}
              sections={sections}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={handleSectionChange}
              touchableComponent={Pressable}
            />
          ) : (
            <Text style={styles.noAccounts}>
              У вас нет управляемых аккаунтов
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </PageTemplate>
  );
};

export default AccountManagement;
