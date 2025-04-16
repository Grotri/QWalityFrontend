import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { palette } from "../../src/constants/palette";

const PlusIcon: FC<IIcon> = ({
  color = palette.white,
  style,
  width = 34,
  height = 34,
  stroke = 5,
}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 34 34"
    style={style}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={stroke}
      d="M17 3v28m14 -14H3"
    />
  </Svg>
);

export default PlusIcon;
