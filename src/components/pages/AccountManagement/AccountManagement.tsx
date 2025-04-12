import React, { useEffect, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import Header from "../../molecules/Header";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { styles } from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import { IUserSection } from "./types";
import { ArrowTopIcon, ProfileIconSmall } from "../../../../assets/icons";
import Input from "../../atoms/Input";
import Dropdown from "../../atoms/Dropdown";
import { roles } from "../../../constants/roles";
import Button from "../../atoms/Button";
import { palette } from "../../../constants/palette";
import { users } from "../../../constants/users";

const AccountManagement = () => {
  const { navigate } = useMainNavigation();
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [sections, setSections] = useState<IUserSection[]>([...users]);
  const [isDdOpen, setIsDdOpen] = useState<boolean>(false);

  const closeDd = () => {
    if (isDdOpen) {
      setIsDdOpen(false);
    }
  };

  useEffect(() => {
    closeDd();
  }, [activeSections]);

  const renderHeader = (section: IUserSection) => {
    const active =
      activeSections.length > 0 &&
      sections[activeSections[0]].title === section.title;

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ProfileIconSmall />
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
        <ArrowTopIcon style={!active && { transform: [{ scaleY: -1 }] }} />
      </View>
    );
  };

  const renderContent = (section: IUserSection) => {
    return (
      <View style={styles.content}>
        <Input
          label="Логин"
          value={section.login}
          onChangeText={(val) =>
            setSections(
              sections.map((sec) =>
                sec.id === section.id ? { ...sec, login: val } : sec
              )
            )
          }
          customInputStyles={styles.input}
          customLabelStyles={styles.inputLabel}
        />
        <Input
          label="Пароль"
          value={section.password}
          onChangeText={(val) =>
            setSections(
              sections.map((sec) =>
                sec.id === section.id ? { ...sec, password: val } : sec
              )
            )
          }
          secureTextEntry
          customInputStyles={styles.input}
          customLabelStyles={styles.inputLabel}
        />
        <Dropdown
          data={roles.map((role) => ({
            value: role.id,
            label: role.name,
          }))}
          value={section.role}
          setValue={(item) =>
            setSections(
              sections.map((sec) =>
                sec.id === section.id ? { ...sec, role: item } : sec
              )
            )
          }
          isOpen={isDdOpen}
          setIsOpen={setIsDdOpen}
          label="Роль"
          wrapperStyle={[
            styles.dropdownWrapper,
            { marginBottom: isDdOpen ? 100 : 18 },
          ]}
          labelStyle={styles.inputLabel}
          dropdownStyle={styles.dropdown}
          itemContainerStyle={styles.itemContainerStyle}
          borderColor={palette.textFieldInFolderBg}
        />
        <View style={styles.btns}>
          <Button color="management" style={styles.btn}>
            <Text style={styles.btnText}>Изменить</Text>
          </Button>
          <Button color="red" style={styles.btn}>
            <Text style={styles.btnText}>Удалить</Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    <PageTemplate>
      <TouchableWithoutFeedback onPress={closeDd}>
        <View style={styles.wrapper}>
          <Header
            headerText="Управление аккаунтами"
            onClick={() => navigate("Admin")}
          />
          <View style={styles.managerWrapper}>
            <Accordion
              containerStyle={styles.accordion}
              sections={sections}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={setActiveSections}
              touchableComponent={Pressable}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </PageTemplate>
  );
};

export default AccountManagement;
