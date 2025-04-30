import React, { useEffect, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { CrossIcon, TrashBinIcon } from "../../../../assets/icons";
import Button from "../../atoms/Button";
import Modal from "../../atoms/Modal";
import DatePicker from "../../atoms/DatePicker";
import { palette } from "../../../constants/palette";
import { IDefect } from "../Main/types";
import Defect from "../../molecules/Defect";
import BottomFixIcon from "../../molecules/BottomFixIcon";
import useCamerasStore from "../../../hooks/useCamerasStore";
import useAuthStore from "../../../hooks/useAuthStore";

const TrashBin = () => {
  const { navigate } = useMainNavigation();
  const { cameras, recoverDefect, clearTrashBin, clearTrashBinByDates } =
    useCamerasStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const deletedDefects = cameras.flatMap((camera) =>
    camera.defects.filter((d) => d.isDeleted)
  );

  useEffect(() => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }, [cameras]);

  useEffect(() => {
    if (!isModalOpen) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [isModalOpen]);

  return (
    <PageTemplate
      headerText="Корзина"
      underlined
      onHeaderClick={() => navigate("Main", { direction: "backward" })}
      isWholeBlurOn={isModalOpen}
      bottomIcon={
        deletedDefects.length > 0 && user.role !== "user" ? (
          <BottomFixIcon
            icon={<TrashBinIcon width={36} height={36} />}
            text="Очистить"
            onPress={() => setIsModalOpen(true)}
            gap={2}
            marginRight={24}
            marginBottom={28}
          />
        ) : null
      }
    >
      <View style={styles.wrapper}>
        {deletedDefects.length > 0 ? (
          cameras.map((camera) =>
            camera.defects
              .filter((d) => d.isDeleted)
              .map((defect: IDefect) => (
                <Defect
                  key={defect.id}
                  defect={defect}
                  textBtn={user.role !== "user" ? "Восстановить" : undefined}
                  onPress={() => recoverDefect(camera.id, defect.id)}
                />
              ))
          )
        ) : (
          <Text style={styles.noDefects}>Корзина пуста</Text>
        )}
      </View>
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
            <Button color="red" style={styles.btnModal} onPress={clearTrashBin}>
              <Text style={styles.btnModalText}>Удалить всё</Text>
            </Button>
            <View style={styles.empty} />
            <Button
              customColor={palette.modalBtn}
              style={styles.btnModal}
              onPress={() => clearTrashBinByDates(startDate, endDate)}
            >
              <Text style={styles.btnModalText}>Удалить</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </PageTemplate>
  );
};

export default TrashBin;
