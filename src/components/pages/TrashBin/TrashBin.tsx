import React, { useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { CrossIcon, TrashBinIcon } from "../../../../assets/icons";
import { trashBinItems } from "../../../constants/trashBinItems";
import Button from "../../atoms/Button";
import BlurView from "../../atoms/BlurView";
import Modal from "../../atoms/Modal";
import DatePicker from "../../atoms/DatePicker";
import { palette } from "../../../constants/palette";
import { IDefect } from "../Main/types";
import Defect from "../../molecules/Defect";

const TrashBin = () => {
  const { navigate } = useMainNavigation();
  const [trashItems, setTrashItems] = useState<IDefect[]>([...trashBinItems]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const clearAll = () => {
    setTrashItems([]);
    setIsModalOpen(false);
  };

  return (
    <PageTemplate
      headerText="Корзина"
      underlined
      onHeaderClick={() => navigate("Main", { direction: "backward" })}
      bottomIcon={
        <Pressable style={styles.clearBtn} onPress={() => setIsModalOpen(true)}>
          <View style={styles.circle}>
            <TrashBinIcon width={36} height={36} />
          </View>
          <Text style={styles.clearBtnText}>Очистить</Text>
        </Pressable>
      }
    >
      <View style={styles.wrapper}>
        {trashItems.map((item: IDefect) => (
          <Defect key={item.id} defect={item} textBtn="Восстановить" />
        ))}
      </View>
      {isModalOpen && <BlurView />}
      <Modal isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
        <View style={styles.modal}>
          <View style={styles.crossIconWrapper}>
            <CrossIcon
              style={styles.crossIcon}
              onClick={() => setIsModalOpen(false)}
            />
            <Text style={styles.modalTitle}>Удалить историю</Text>
          </View>
          <View style={styles.row}>
            <DatePicker
              date={startDate}
              setDate={(date) => setStartDate(date)}
            />
            <View style={styles.dash} />
            <DatePicker date={endDate} setDate={(date) => setEndDate(date)} />
          </View>
          <View style={styles.row}>
            <Button color="red" style={styles.btnModal} onPress={clearAll}>
              <Text style={styles.btnModalText}>Удалить всё</Text>
            </Button>
            <View style={styles.empty} />
            <Button customColor={palette.modalBtn} style={styles.btnModal}>
              <Text style={styles.btnModalText}>Удалить</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </PageTemplate>
  );
};

export default TrashBin;
