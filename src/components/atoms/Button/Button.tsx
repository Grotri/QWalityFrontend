import React, { FC } from "react";
import { IButton } from "./types";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";

const Button: FC<IButton> = ({
  children,
  onPress,
  style,
  color,
  customColor,
}) => {
  const buttonColorStyle = styles[`btn_${color}` as keyof typeof styles];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        buttonColorStyle,
        customColor && { backgroundColor: customColor },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
