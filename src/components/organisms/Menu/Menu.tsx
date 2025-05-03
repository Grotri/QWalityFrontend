import React, { FC } from "react";
import { menuItems } from "../../../constants/menuItems";
import { Pressable, Text, View } from "react-native";
import MenuItem from "../../molecules/MenuItem";
import { IMenu, IMenuItem } from "./types";
import { getStyles } from "./styles";
import { LogoIcon, MenuProfileIcon } from "../../../../assets/icons";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Hamburger from "../../atoms/Hamburger/Hamburger";
import useAuthStore from "../../../hooks/useAuthStore";

const Menu: FC<IMenu> = ({ isExpanded, setIsExpanded }) => {
  const { navigate } = useMainNavigation();
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);

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
