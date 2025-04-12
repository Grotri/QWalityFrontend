import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { palette } from "../../src/constants/palette";

const ArrowTopFAQIcon: FC<IIcon> = ({
  color = palette.white,
  style,
  width = 26,
  height = 17,
  stroke = 3,
}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 26 17"
    style={style}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={stroke}
      d="m2 15.5 9.387-12.8a2 2 0 0 1 3.226 0L24 15.5"
    />
  </Svg>
);

export default ArrowTopFAQIcon;
