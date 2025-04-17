import React, { useEffect, useRef, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { styles } from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import { IUserSection } from "./types";
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
import { users } from "../../../constants/users";
import { useSharedValue, withTiming } from "react-native-reanimated";
import IconRotated from "../../atoms/IconRotated";

const AccountManagement = () => {
  const { navigate } = useMainNavigation();
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [sections, setSections] = useState<IUserSection[]>([...users]);
  const [isDdOpen, setIsDdOpen] = useState<boolean>(false);
  const rotations = useRef(sections.map(() => useSharedValue(0))).current;

  const handleSectionChange = (sections: number[]) => {
    const newActiveIndex = sections[0];

    rotations.forEach((rotation, index) => {
      rotation.value = withTiming(newActiveIndex === index ? 1 : 0);
    });

    setActiveSections(sections);
  };

  const closeDd = () => {
    if (isDdOpen) {
      setIsDdOpen(false);
    }
  };

  useEffect(() => {
    closeDd();
  }, [activeSections]);

  const renderHeader = (section: IUserSection, index: number) => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <ProfileIconSmall />
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
      <IconRotated
        icon={<ArrowTopIcon style={{ transform: [{ scaleY: -1 }] }} />}
        rotation={rotations[index]}
        isActive={activeSections.includes(index)}
      />
    </View>
  );

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
          cursorColor={palette.subTextMainScreenPopup}
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
          cursorColor={palette.subTextMainScreenPopup}
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
    <PageTemplate
      headerText="Управление аккаунтами"
      onHeaderClick={() => navigate("Admin", { direction: "backward" })}
    >
      <TouchableWithoutFeedback onPress={closeDd}>
        <View style={styles.managerWrapper}>
          <Accordion
            containerStyle={styles.accordion}
            sections={sections}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={handleSectionChange}
            touchableComponent={Pressable}
          />
        </View>
      </TouchableWithoutFeedback>
    </PageTemplate>
  );
};

export default AccountManagement;
