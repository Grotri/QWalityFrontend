import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { IRadio } from "./types";
import { styles } from "./styles";

const Radio: FC<IRadio> = ({
  label,
  isChecked = false,
  setIsChecked,
  style,
}) => (
  <Pressable onPress={setIsChecked} style={[styles.wrapper, style]}>
    <View style={styles.radioWrapper}>
      <View style={styles.radio}>
        {isChecked && <View style={styles.radioChecked} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </View>
  </Pressable>
);

export default Radio;
