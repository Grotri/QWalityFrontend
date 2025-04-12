import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { palette } from "../../src/constants/palette";

const ArrowTopIcon: FC<IIcon> = ({
  color = palette.white,
  style,
  width = 18,
  height = 13,
  stroke = 3,
}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 18 13"
    style={style}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={stroke}
      d="m2 11 5.362 -7.66a2 2 0 0 1 3.277 0L16 11"
    />
  </Svg>
);
export default ArrowTopIcon;
