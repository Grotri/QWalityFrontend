import React, { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ArrowBottomIcon, CrossIcon } from "../../../../assets/icons";
import { usePalette } from "../../../hooks/usePalette";
import Button from "../../atoms/Button";
import Dropdown from "../../atoms/Dropdown";
import Modal from "../../atoms/Modal";
import { ESortOptions } from "./enums";
import { getStyles } from "./styles";
import { ICameraSortModal } from "./types";

const CameraSortModal: FC<ICameraSortModal> = ({
  isOpen,
  initialOption,
  setIsOpen,
  onApply,
}) => {
  const styles = getStyles();
  const palette = usePalette();
  const [isDDOpen, setIsDDOpen] = useState<boolean>(false);
  const [option, setOption] = useState<keyof typeof ESortOptions>("type");

  const closeModal = () => {
    setIsOpen(false);
    setOption("type");
    if (isDDOpen) {
      setIsDDOpen(false);
    }
  };

  const handleApply = () => {
    onApply(option);
    closeModal();
  };

  const handleReset = () => {
    onApply(undefined);
    closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      setOption(initialOption || "type");
    }
  }, [isOpen, initialOption]);

  return (
    <Modal
      isVisible={isOpen}
      setIsVisible={closeModal}
      onPress={() => setIsDDOpen(false)}
    >
      <View style={styles.modal}>
        <View style={styles.crossIconWrapper}>
          <CrossIcon style={styles.crossIcon} onClick={closeModal} />
          <Text style={styles.modalTitle}>Сортировать</Text>
        </View>
        <View style={styles.content}>
          <Dropdown
            data={Object.entries(ESortOptions).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
            value={option}
            setValue={(item) => setOption(item as keyof typeof ESortOptions)}
            isOpen={isDDOpen}
            setIsOpen={setIsDDOpen}
            dropdownStyle={styles.dropdown}
            borderColor={palette.subDropdownListBgTransparent}
            arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
          />
          <View style={styles.btns}>
            <Button style={styles.btn} color="modal" onPress={handleApply}>
              <Text style={styles.btnText}>Применить</Text>
            </Button>
            {initialOption && (
              <Button style={styles.btn} color="darkBlue" onPress={handleReset}>
                <Text style={styles.btnText}>Сбросить сортировку</Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CameraSortModal;
