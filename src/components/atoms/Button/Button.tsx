import React, { FC } from "react";
import { IButton } from "./types";
import { TouchableOpacity } from "react-native";
import { getStyles } from "./styles";
import useAuthStore from "../../../hooks/useAuthStore";

const Button: FC<IButton> = ({
  children,
  onPress,
  style,
  color,
  customColor,
  disabled,
}) => {
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);
  
  const buttonColorStyle = styles[`btn_${color}` as keyof typeof styles];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
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
