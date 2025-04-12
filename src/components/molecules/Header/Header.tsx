import React, { FC } from "react";
import { Text, View } from "react-native";
import { ArrowLeftIcon } from "../../../../assets/icons";
import { styles } from "./styles";
import { IHeader } from "./types";

const Header: FC<IHeader> = ({ onClick, headerText, underlined }) => (
  <View style={styles.wrapper}>
    <View style={styles.header}>
      {onClick && <ArrowLeftIcon onClick={onClick} />}
      <View style={styles.headerTextWrapper}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
    </View>
    {underlined && <View style={styles.line} />}
  </View>
);

export default Header;
