import React, { FC } from "react";
import { IHomeListPoint } from "./types";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { palette } from "../../../constants/palette";

const HomeListPoint: FC<IHomeListPoint> = ({ text }) => {
  return (
    <LinearGradient
      colors={[
        palette.welcomeScreenGradientDark,
        palette.welcomeScreenGradientLight,
      ]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0.6356, 1]}
      style={styles.listPoint}
    >
      <View style={styles.listPointCircle}></View>
      <Text style={styles.listPointText}>{text}</Text>
    </LinearGradient>
  );
};

export default HomeListPoint;
