import React, { FC } from "react";
import { IDefectItem } from "./types";
import { Text, View } from "react-native";
import Button from "../../atoms/Button";
import { styles } from "./styles";

const Defect: FC<IDefectItem> = ({ defect, textBtn, onPress }) => {
  const { name, date } = defect;

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.item}>
        <View style={styles.image}>
          <Text style={styles.imageText}>.jpg</Text>
        </View>
        <View>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemDate}>{date}</Text>
        </View>
      </View>
      <Button onPress={onPress}>
        <Text style={styles.btnText}>{textBtn}</Text>
      </Button>
    </View>
  );
};

export default Defect;
