import React, { FC, useEffect, useState } from "react";
import { ICameraFilterModal, initialCameraFilter } from "./types";
import { Text, View } from "react-native";
import Modal from "../../atoms/Modal";
import { styles } from "./styles";
import { ArrowBottomIcon, CrossIcon } from "../../../../assets/icons";
import Dropdown from "../../atoms/Dropdown";
import { palette } from "../../../constants/palette";
import Button from "../../atoms/Button";
import Radio from "../../atoms/Radio";
import DatePicker from "../../atoms/DatePicker";
import { EDefectFilterOptions } from "./enums";
import { showErrorToast } from "../../../helpers/toast";
import { EErrors } from "../../../constants/errors";

const CameraFilterModal: FC<ICameraFilterModal> = ({
  isOpen,
  setIsOpen,
  initialFilter,
  onApply,
}) => {
  const [isDDOpen, setIsDDOpen] = useState<boolean>(false);
  const [isDateFilter, setIsDateFilter] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [option, setOption] =
    useState<keyof typeof EDefectFilterOptions>("missingElement");

  const closeModal = () => {
    setIsOpen(false);
    if (!isDateFilter) {
      setIsDateFilter(true);
    }
    if (isDDOpen) {
      setIsDDOpen(false);
    }
    setStartDate(null);
    setEndDate(null);
    setOption("missingElement");
  };

  const handleApply = () => {
    if (isDateFilter) {
      if (!startDate || !endDate) {
        showErrorToast(EErrors.chooseDates);
        return;
      }

      if (startDate > endDate) {
        showErrorToast(EErrors.timeDates);
        return;
      }
    }

    onApply({
      isDateFilter,
      startDate,
      endDate,
      option,
    });
    closeModal();
  };

  const handleReset = () => {
    onApply({ ...initialCameraFilter });
    closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      setIsDateFilter(initialFilter.isDateFilter);
      setStartDate(initialFilter.startDate);
      setEndDate(initialFilter.endDate);
      setOption(initialFilter.option);
    }
  }, [isOpen, initialFilter]);

  return (
    <Modal
      isVisible={isOpen}
      setIsVisible={closeModal}
      onPress={() => setIsDDOpen(false)}
    >
      <View style={styles.modal}>
        <View style={styles.crossIconWrapper}>
          <CrossIcon style={styles.crossIcon} onClick={closeModal} />
          <Text style={styles.modalTitle}>Фильтровать</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.radioWrapper}>
            <Radio
              label="По дате"
              isChecked={isDateFilter}
              setIsChecked={() => setIsDateFilter(true)}
              style={styles.radio}
              radioWrapperStyle={styles.radioWrapperStyle}
              labelStyle={styles.labelStyle}
            />
            <View style={styles.row}>
              <DatePicker
                date={startDate}
                setDate={(date) => setStartDate(date)}
                datePickerStyle={styles.datePickerStyle}
              />
              <View style={styles.dash} />
              <DatePicker
                date={endDate}
                setDate={(date) => setEndDate(date)}
                datePickerStyle={styles.datePickerStyle}
              />
            </View>
          </View>
          <View style={styles.radioWrapper}>
            <Radio
              label="По дефектам"
              isChecked={!isDateFilter}
              setIsChecked={() => setIsDateFilter(false)}
              style={styles.radio}
              radioWrapperStyle={styles.radioWrapperStyle}
              labelStyle={styles.labelStyle}
            />
            <Dropdown
              data={Object.entries(EDefectFilterOptions).map(
                ([key, value]) => ({
                  value: key,
                  label: value,
                })
              )}
              value={option}
              setValue={(item) =>
                setOption(item as keyof typeof EDefectFilterOptions)
              }
              isOpen={isDDOpen}
              setIsOpen={setIsDDOpen}
              dropdownStyle={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              borderColor={palette.subDropdownListBgTransparent}
              arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
              maxHeight={300}
            />
          </View>
          <Button style={styles.btn} color="modal" onPress={handleApply}>
            <Text style={styles.btnText}>Применить</Text>
          </Button>
          {JSON.stringify(initialCameraFilter) !==
            JSON.stringify(initialFilter) && (
            <Button style={styles.btn} color="darkBlue" onPress={handleReset}>
              <Text style={styles.btnText}>Сбросить фильтры</Text>
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CameraFilterModal;
