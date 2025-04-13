import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { TrashBinIcon } from "../../../../assets/icons";
import { trashBinItems } from "../../../constants/trashBinItems";
import { ITrashBinItem } from "./types";
import Button from "../../atoms/Button";

const TrashBin = () => {
  const { navigate } = useMainNavigation();

  return (
    <PageTemplate
      headerText="Корзина"
      underlined
      onHeaderClick={() => navigate("Main", { direction: "backward" })}
      bottomIcon={
        <Pressable style={styles.clearBtn}>
          <View style={styles.circle}>
            <TrashBinIcon width={36} height={36} />
          </View>
          <Text style={styles.clearBtnText}>Очистить</Text>
        </Pressable>
      }
    >
      <View style={styles.wrapper}>
        {trashBinItems.map((item: ITrashBinItem) => (
          <View key={item.id} style={styles.itemWrapper}>
            <View style={styles.trashBinItem}>
              <View style={styles.image}>
                <Text style={styles.imageText}>.jpg</Text>
              </View>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
            </View>
            <Button>
              <Text style={styles.btnText}>Восстановить</Text>
            </Button>
          </View>
        ))}
      </View>
    </PageTemplate>
  );
};

export default TrashBin;
