import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { palette } from "../../src/constants/palette";

const FilterIcon: FC<IIcon> = ({
  color = palette.white,
  style,
  width = 19,
  height = 19,
}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 19 19"
    style={style}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.417 2.375H1.583l6.334 7.49v5.177l3.166 1.583v-6.76z"
    />
  </Svg>
);

export default FilterIcon;
