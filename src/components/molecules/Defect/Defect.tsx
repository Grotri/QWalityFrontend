import React, { FC } from "react";
import { IDefectItem } from "./types";
import { Text, View } from "react-native";
import Button from "../../atoms/Button";
import { getStyles } from "./styles";
import { convertISODate } from "../../../helpers/formatDate";
import useAuthStore from "../../../hooks/useAuthStore";

const Defect: FC<IDefectItem> = ({
  defect,
  textBtn,
  onPress,
  setSelectedDefect,
  pressableIcon = false,
}) => {
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);
  const { name, date } = defect;

  const clickDefect = () => {
    if (setSelectedDefect) {
      setSelectedDefect(defect);
    }
  };

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.item}>
        {pressableIcon ? (
          <Button style={styles.image} onPress={clickDefect}>
            <Text style={styles.imageText}>.jpg</Text>
          </Button>
        ) : (
          <View style={styles.image}>
            <Text style={styles.imageText}>.jpg</Text>
          </View>
        )}
        <View>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemDate}>{convertISODate(date)}</Text>
        </View>
      </View>
      {textBtn && (
        <Button onPress={onPress}>
          <Text style={styles.btnText}>{textBtn}</Text>
        </Button>
      )}
    </View>
  );
};

export default Defect;
