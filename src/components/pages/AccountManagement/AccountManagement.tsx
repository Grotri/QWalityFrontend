import React, { useEffect, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { styles } from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import {
  ArrowBottomIcon,
  ArrowTopIcon,
  ProfileIconSmall,
} from "../../../../assets/icons";
import Input from "../../atoms/Input";
import Dropdown from "../../atoms/Dropdown";
import { roles } from "../../../constants/roles";
import Button from "../../atoms/Button";
import { palette } from "../../../constants/palette";
import IconRotated from "../../atoms/IconRotated";
import { IAccount } from "../../../constants/account";
import useAccountStore from "../../../hooks/useAccountStore";
import InputPassword from "../../atoms/InputPassword";

const AccountManagement = () => {
  const { navigate } = useMainNavigation();
  const {
    accounts,
    changeAccount,
    deleteAccount,
    errors,
    changeError,
    refreshErrors,
  } = useAccountStore();
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [sections, setSections] = useState<IAccount[]>([...accounts]);
  const [isDdOpen, setIsDdOpen] = useState<boolean>(false);

  const handleSectionChange = (sections: number[]) => {
    setActiveSections(sections);
  };

  const changeAccountField = (
    id: string,
    field: keyof IAccount,
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
    setSections([...accounts]);
  }, [accounts]);

  useEffect(() => {
    refreshErrors();
  }, []);

  const renderHeader = (section: IAccount, index: number) => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <ProfileIconSmall />
        <Text style={styles.headerText}>{section.name}</Text>
      </View>
      <IconRotated
        icon={<ArrowTopIcon style={{ transform: [{ scaleY: -1 }] }} />}
        isActive={activeSections.includes(index)}
      />
    </View>
  );

  const renderContent = (section: IAccount, index: number) => {
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
          data={roles.map((role) => ({
            value: role.id,
            label: role.name,
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
            onPress={() => changeAccount(index, section)}
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
          {accounts.length > 0 ? (
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
