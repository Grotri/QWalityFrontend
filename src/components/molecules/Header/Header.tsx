import React, { FC } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { ArrowLeftIcon } from "../../../../assets/icons";
import { getStyles } from "./styles";
import { IHeader } from "./types";

const Header: FC<IHeader> = ({ onClick, headerText, underlined }) => {
  const styles = getStyles();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          {onClick && <ArrowLeftIcon onClick={onClick} />}
          <View
            style={[
              styles.headerTextWrapper,
              onClick && styles.shortHeaderTextWrapper,
            ]}
          >
            <Text style={styles.headerText}>{headerText}</Text>
          </View>
        </View>
        {underlined && <View style={styles.line} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
