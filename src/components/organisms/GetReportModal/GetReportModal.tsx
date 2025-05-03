import React, { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ArrowBottomIcon, CrossIcon } from "../../../../assets/icons";
import { formats } from "../../../constants/formats";
import { showSuccessToast } from "../../../helpers/toast";
import { usePalette } from "../../../hooks/usePalette";
import Button from "../../atoms/Button";
import DatePicker from "../../atoms/DatePicker";
import Dropdown from "../../atoms/Dropdown";
import Modal from "../../atoms/Modal";
import Radio from "../../atoms/Radio";
import { getStyles } from "./styles";
import { IGetReportModal } from "./types";

const GetReportModal: FC<IGetReportModal> = ({ isOpen, setIsOpen }) => {
  const styles = getStyles();
  const palette = usePalette();
  const [isSubModalOpened, setIsSubModalOpened] = useState<boolean>(false);
  const [isFormatDdOpen, setIsFormatDdOpen] = useState<boolean>(false);
  const [type, setType] = useState<"report" | "log">("report");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [format, setFormat] = useState<string>("0");

  const closeModals = () => {
    if (isSubModalOpened) {
      setIsSubModalOpened(false);
    }
    setIsOpen(false);
    if (isFormatDdOpen) {
      setIsFormatDdOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setType("report");
      setStartDate(null);
      setEndDate(null);
      setFormat("0");
    }
  }, [isOpen]);

  return (
    <View style={styles.wrapper}>
      <Modal
        isVisible={isOpen}
        setIsVisible={setIsOpen}
        onPress={() => {
          if (isFormatDdOpen) {
            setIsFormatDdOpen(false);
          }
        }}
        onBackdropPress={closeModals}
      >
        <View style={styles.modals}>
          <View style={styles.modal}>
            <View style={styles.crossIconWrapper}>
              <CrossIcon style={styles.crossIcon} onClick={closeModals} />
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
                  arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
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
                  onPress={() => {
                    closeModals();
                    showSuccessToast("Лог скачан");
                  }}
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
                    onPress={() => {
                      closeModals();
                      showSuccessToast("Лог удален");
                    }}
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
  );
};

export default GetReportModal;
