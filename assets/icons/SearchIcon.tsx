import * as React from "react";
import { FC } from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { IIcon } from "./types";
import { palette } from "../../src/constants/palette";

const SearchIcon: FC<IIcon> = ({
  color = palette.white,
  style,
  width = 14,
  height = 14,
  stroke = 2,
}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 14 14"
    style={style}
  >
    <G clipPath="url(#a)">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M12.25 12.25 9.713 9.713m1.37-3.296a4.667 4.667 0 1 1-9.333 0 4.667 4.667 0 0 1 9.333 0"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h14v14H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SearchIcon;
