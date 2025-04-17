import React from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";
import { IBottomFixIcon } from "./types";
import { styles } from "./styles";
import { palette } from "../../../constants/palette";

const BottomFixIcon: React.FC<IBottomFixIcon> = ({
  icon,
  text,
  onPress,
  gap,
}) => {
  const SIZE_HEIGHT = 140;
  const SIZE_WIDTH = 120;

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <Svg
        height={SIZE_HEIGHT}
        width={SIZE_WIDTH}
        style={[
          styles.gradient,
          {
            transform: [
              { translateX: -SIZE_WIDTH / 2 },
              { translateY: -SIZE_HEIGHT / 2 },
            ],
          },
        ]}
      >
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor={palette.bg} stopOpacity="1" />
            <Stop offset="100%" stopColor={palette.bg} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={SIZE_WIDTH}
          height={SIZE_HEIGHT}
          fill="url(#grad)"
        />
      </Svg>
      <View style={[styles.btn, { gap }]}>
        <View style={styles.circle}>{icon}</View>
        <Text style={styles.btnText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default BottomFixIcon;
