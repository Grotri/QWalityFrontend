import React, { FC } from "react";
import { IInput } from "./types";
import { Platform, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { palette } from "../../../constants/palette";
import * as NavigationBar from "expo-navigation-bar";

const Input: FC<IInput> = ({
  value,
  label,
  customStyles,
  customInputStyles,
  customLabelStyles,
  customInputWrapperStyles,
  onChangeText,
  placeholder,
  keyboardType = "default",
  keyboardAppearance = "default",
  inputMode = "text",
  maxLength,
  secureTextEntry = false,
  placeholderTextColor,
  rightIcon,
  cursorColor = palette.black,
  errorText,
  errorStyles,
}) => {
  return (
    <View style={[styles.container, customStyles]}>
      {label && <Text style={[styles.label, customLabelStyles]}>{label}</Text>}
      <View style={customInputWrapperStyles}>
        <TextInput
          style={[
            styles.input,
            errorText && styles.inputError,
            !!rightIcon && styles.inputIcon,
            customInputStyles,
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          keyboardAppearance={keyboardAppearance}
          inputMode={inputMode}
          maxLength={maxLength}
          cursorColor={cursorColor}
          secureTextEntry={secureTextEntry}
          onKeyPress={() => {
            if (Platform.OS === "android") {
              NavigationBar.setVisibilityAsync("hidden");
            }
          }}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {errorText && (
        <Text style={[styles.error, errorStyles]}>{errorText}</Text>
      )}
    </View>
  );
};

export default Input;
