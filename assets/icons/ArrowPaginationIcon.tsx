import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { palette } from "../../src/constants/palette";
import Button from "../../src/components/atoms/Button";

const ArrowPaginationIcon: FC<IIcon> = ({
  color = palette.white,
  style,
  onClick,
  width = 9,
  height = 14,
  stroke = 2,
  disabled = false,
}) => (
  <Button
    onPress={onClick}
    style={[style, { paddingHorizontal: 8, paddingVertical: 4 }]}
    disabled={disabled}
  >
    <Svg width={width} height={height} fill="none" viewBox="0 0 9 14">
      <Path
        stroke={color}
        strokeLinecap="round"
        d="M8 13 1.067 7.8a1 1 0 0 1 0 -1.6L8 1"
        strokeWidth={stroke}
      />
    </Svg>
  </Button>
);

export default ArrowPaginationIcon;
