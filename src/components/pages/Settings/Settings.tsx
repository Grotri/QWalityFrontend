import React, { useEffect, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { Text, View } from "react-native";
import { styles } from "./styles";
import Dropdown from "../../atoms/Dropdown";
import { settingsItems } from "./types";
import { ArrowBottomIcon } from "../../../../assets/icons";
import Button from "../../atoms/Button";

const Settings = () => {
  const { navigate } = useMainNavigation();
  const [isFirstDDOpen, setIsFirstDDOpen] = useState<boolean>(false);
  const [isAutoDelete, setIsAutoDelete] = useState<string>("No");
  const [isSecondDDOpen, setIsSecondDDOpen] = useState<boolean>(false);
  const [isAutoClear, setIsAutoClear] = useState<string>("No");

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
      onHeaderClick={() => navigate("Main")}
      mustScroll={false}
      onTouchablePress={closeDD}
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
            arrowDownIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
            arrowUpIconComponent={
              <ArrowBottomIcon
                stroke={2}
                height={9}
                style={{ transform: [{ scaleY: -1 }] }}
              />
            }
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
            arrowDownIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
            arrowUpIconComponent={
              <ArrowBottomIcon
                stroke={2}
                height={9}
                style={{ transform: [{ scaleY: -1 }] }}
              />
            }
          />
        </View>
        <Button
          style={[styles.btn, { marginTop: 22, marginBottom: 16 }]}
          color="blue"
        >
          <Text style={styles.btnText}>Выйти из аккаунта</Text>
        </Button>
        <Button style={[styles.btn, { marginBottom: 8 }]} color="red">
          <Text style={styles.btnText}>Удалить аккаунт</Text>
        </Button>
        <Text style={styles.version}>QWality Release v1.0.0</Text>
      </View>
    </PageTemplate>
  );
};

export default Settings;
