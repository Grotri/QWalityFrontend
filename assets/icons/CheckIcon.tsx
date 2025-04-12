import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { palette } from "../../src/constants/palette";

const CheckIcon: FC<IIcon> = ({
  color = palette.subScreenPopupBg,
  width = 14,
}) => (
  <Svg width={width} height={width} fill="none" viewBox="0 0 14 14">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M11.667 3.5 5.25 9.917 2.333 7"
    />
  </Svg>
);

export default CheckIcon;
