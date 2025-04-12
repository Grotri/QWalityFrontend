import React, { FC } from "react";
import { IButton } from "./types";
import { Pressable } from "react-native";
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
    <Pressable
      onPress={onPress}
      style={[
        styles.btn,
        buttonColorStyle,
        customColor && { backgroundColor: customColor },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

export default Button;
