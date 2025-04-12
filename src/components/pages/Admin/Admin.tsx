import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import Header from "../../molecules/Header";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import PageTemplate from "../../templates/PageTemplate";
import { Slider } from "@miblanchard/react-native-slider";
import { palette } from "../../../constants/palette";
import { CrossIcon, TooltipIcon } from "../../../../assets/icons";
import { screenWidth } from "../../../constants/screenSize";
import Input from "../../atoms/Input";
import Dropdown from "../../atoms/Dropdown";
import Button from "../../atoms/Button";
import { roles } from "../../../constants/roles";
import Modal from "../../atoms/Modal";
import BlurView from "../../atoms/BlurView";
import Radio from "../../atoms/Radio";
import DatePicker from "../../atoms/DatePicker";
import { formats } from "../../../constants/formats";

const Admin = () => {
  const initialConfidence = 0.75;
  const { navigate } = useMainNavigation();
  const [confidence, setConfidence] = useState<number>(initialConfidence);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("0");
  const [isMainModalOpened, setIsMainModalOpened] = useState<boolean>(false);
  const [isSubModalOpened, setIsSubModalOpened] = useState<boolean>(false);
  const [type, setType] = useState<"report" | "log">("report");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [format, setFormat] = useState<string>("0");
  const [isRoleDdOpen, setIsRoleDdOpen] = useState<boolean>(false);
  const [isFormatDdOpen, setIsFormatDdOpen] = useState<boolean>(false);

  const sliderWidth = screenWidth - 54 * 2;
  const tooltipWidth = 39;
  const thumbWidth = 15;
  const percentageOffset =
    confidence * (sliderWidth - thumbWidth) + thumbWidth / 2 - tooltipWidth / 2;

  const closeModals = () => {
    if (isSubModalOpened) {
      setIsSubModalOpened(false);
    }
    setIsMainModalOpened(false);
    if (isFormatDdOpen) {
      setIsFormatDdOpen(false);
    }
  };

  const closeDropdowns = () => {
    if (isRoleDdOpen) {
      setIsRoleDdOpen(false);
    }
    if (isFormatDdOpen) {
      setIsFormatDdOpen(false);
    }
  };

  return (
    <PageTemplate mustScroll={false} onPress={closeDropdowns}>
      <View style={styles.wrapper}>
        <Header
          headerText="Админ панель"
          underlined
          onClick={() => navigate("Profile")}
        />
        <View style={styles.adminWrapper}>
          <Text style={styles.subTitle}>Уверенность нейросети</Text>
          <View style={styles.sliderWrapper}>
            <Slider
              containerStyle={styles.slider}
              trackStyle={styles.sliderTrack}
              thumbStyle={styles.sliderThumb}
              value={initialConfidence}
              onValueChange={(val) => setConfidence(+val[0].toFixed(2))}
              minimumValue={0}
              maximumValue={1}
              step={0.01}
              trackClickable={true}
              minimumTrackTintColor={palette.textFieldInFolderBg}
              maximumTrackTintColor="#3154AC"
              thumbTintColor="#D9D9D9"
            />
            <View
              style={[
                styles.tooltipWrapper,
                { top: 28, left: percentageOffset },
              ]}
            >
              <TooltipIcon />
              <Text style={styles.tooltipText}>
                {+(confidence * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
          <Text style={styles.subTitle}>Регистрация суб-аккаунта</Text>
          <Input
            label="Логин"
            value={login}
            onChangeText={(text) => setLogin(text)}
            inputMode="email"
            maxLength={254}
            customStyles={styles.confirmationInputWrapper}
            customInputStyles={styles.confirmationInput}
            customLabelStyles={styles.confirmationInputLabel}
          />
          <Input
            label="Пароль"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
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
            isOpen={isRoleDdOpen}
            setIsOpen={setIsRoleDdOpen}
          />
          <Button color="blue" style={styles.btn}>
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
        {isMainModalOpened && <BlurView />}
        <Modal
          isVisible={isMainModalOpened}
          setIsVisible={setIsMainModalOpened}
          onPress={() => {
            if (isFormatDdOpen) {
              setIsFormatDdOpen(false);
            }
          }}
        >
          <View style={styles.modals}>
            <View style={styles.modal}>
              <View style={styles.crossIconWrapper}>
                <CrossIcon
                  style={styles.crossIcon}
                  onClick={() => setIsMainModalOpened(false)}
                />
                <Text style={styles.modalTitle}>Получить отчет</Text>
              </View>
              <View style={styles.modalContent}>
                <View style={styles.row}>
                  <Radio
                    label="Отчет"
                    isChecked={type === "report"}
                    setIsChecked={() => {
                      setType("report");
                    }}
                  />
                  <View style={styles.empty} />
                  <Radio
                    label="Лог"
                    isChecked={type === "log"}
                    setIsChecked={() => {
                      setType("log");
                    }}
                  />
                </View>
                <View style={styles.row}>
                  <DatePicker
                    date={startDate}
                    setDate={(date) => setStartDate(date)}
                  />
                  <View style={styles.dash} />
                  <DatePicker
                    date={endDate}
                    setDate={(date) => setEndDate(date)}
                  />
                </View>
                <View style={styles.row}>
                  <Dropdown
                    data={formats.map((format) => ({
                      value: format.id,
                      label: format.name,
                    }))}
                    value={format}
                    setValue={setFormat}
                    isOpen={isFormatDdOpen}
                    setIsOpen={setIsFormatDdOpen}
                    wrapperStyle={styles.flex}
                    dropdownStyle={styles.dropdownStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    borderColor={palette.dateAndListSelectsPopupBg}
                  />
                  <View style={styles.empty} />
                  <View style={styles.flex} />
                </View>
                <View style={styles.row}>
                  <Button
                    color="red"
                    style={styles.btnModal}
                    onPress={() => setIsSubModalOpened(true)}
                  >
                    <Text style={styles.btnModalText}>Удалить лог</Text>
                  </Button>
                  <View style={styles.empty} />
                  <Button
                    customColor={palette.modalBtn}
                    style={styles.btnModal}
                    onPress={closeModals}
                  >
                    <Text style={styles.btnModalText}>Скачать</Text>
                  </Button>
                </View>
              </View>
            </View>
            {isSubModalOpened && (
              <View style={styles.modal}>
                <Text style={styles.subModalTitle}>
                  Вы точно хотите удалить лог?
                </Text>
                <View style={styles.modalContent}>
                  <View style={styles.row}>
                    <Button
                      color="red"
                      style={styles.btnModal}
                      onPress={closeModals}
                    >
                      <Text style={styles.btnModalTextBold}>Да</Text>
                    </Button>
                    <View style={styles.empty} />
                    <Button
                      customColor={palette.modalBtn}
                      style={styles.btnModal}
                      onPress={() => {
                        setIsSubModalOpened(false);
                      }}
                    >
                      <Text style={styles.btnModalTextBold}>Нет</Text>
                    </Button>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </PageTemplate>
  );
};

export default Admin;
