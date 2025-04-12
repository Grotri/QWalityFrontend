import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { palette } from "../../src/constants/palette";
import { Pressable } from "react-native";

const CrossIcon: FC<IIcon> = ({
  color = palette.mainText,
  width = 14,
  height = 14,
  stroke = 3,
  style,
  onClick,
}) => (
  <Pressable onPress={onClick} style={style}>
    <Svg width={width} height={height} fill="none" viewBox="0 0 14 14">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={stroke}
        d="M2 11.88 11.88 2M2.04 2 12 11.96"
      />
    </Svg>
  </Pressable>
);

export default CrossIcon;
