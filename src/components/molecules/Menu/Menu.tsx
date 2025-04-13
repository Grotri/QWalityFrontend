import React, { useState } from "react";
import { menuItems } from "../../../constants/menuItems";
import { Pressable, Text, View } from "react-native";
import MenuItem from "../../atoms/MenuItem";
import { IMenuItem } from "./types";
import { styles } from "./styles";
import { LogoIcon, MenuProfileIcon } from "../../../../assets/icons";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Hamburger from "../../atoms/Hamburger/Hamburger";

const Menu = () => {
  const { navigate } = useMainNavigation();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable style={[styles.headerBtn, { width: 44 }]} onPress={toggle}>
          <Hamburger active={isExpanded} />
          <Text style={styles.headerBtnTxt}>
            {isExpanded ? "Скрыть" : "Меню"}
          </Text>
        </Pressable>
        <LogoIcon width={83} />
        <Pressable style={styles.headerBtn} onPress={() => navigate("Profile")}>
          <MenuProfileIcon />
          <Text style={styles.headerBtnTxt}>Профиль</Text>
        </Pressable>
      </View>
      {menuItems.map((item: IMenuItem, index: number) => (
        <MenuItem
          key={index}
          index={index}
          icon={item.icon}
          title={item.title}
          isRoundBorder={index === menuItems.length - 1}
          isExpanded={isExpanded}
          onPress={() => navigate(item.path)}
        />
      ))}
    </View>
  );
};

export default Menu;
