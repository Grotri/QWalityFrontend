import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { IRadio } from "./types";
import { getStyles } from "./styles";
import useAuthStore from "../../../hooks/useAuthStore";

const Radio: FC<IRadio> = ({
  label,
  isChecked = false,
  setIsChecked,
  style,
  labelStyle,
  radioWrapperStyle,
}) => {
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);

  return (
    <Pressable onPress={setIsChecked} style={[styles.wrapper, style]}>
      <View style={[styles.radioWrapper, radioWrapperStyle]}>
        <View style={styles.radio}>
          {isChecked && <View style={styles.radioChecked} />}
        </View>
        <Text style={[styles.radioText, labelStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Radio;
