import React, { FC, PropsWithChildren, useState } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../../molecules/Header";
import { IPageTemplate } from "./types";
import { styles } from "./styles";
import Menu from "../../molecules/Menu";
import BlurView from "../../atoms/BlurView";

const PageTemplate: FC<PropsWithChildren & IPageTemplate> = ({
  children,
  mustScroll = true,
  onTouchablePress,
  headerText,
  onHeaderClick,
  underlined = false,
  bottomIcon,
  hasMenu = false,
}) => {
  const insets = useSafeAreaInsets();
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

  const closeMenu = () => {
    if (isMenuExpanded) {
      setIsMenuExpanded(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {hasMenu && (
        <View style={[styles.fixBackground, { height: insets.top }]} />
      )}
      {headerText && (
        <Header
          headerText={headerText}
          onClick={onHeaderClick}
          underlined={underlined}
        />
      )}
      {hasMenu && (
        <Menu isExpanded={isMenuExpanded} setIsExpanded={setIsMenuExpanded} />
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          if (onTouchablePress) {
            onTouchablePress();
          }
        }}
      >
        {mustScroll ? (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            nestedScrollEnabled
          >
            {children}
            {isMenuExpanded && <BlurView onPress={closeMenu} />}
          </ScrollView>
        ) : (
          <View style={styles.scrollContainer}>
            {children}
            {isMenuExpanded && <BlurView onPress={closeMenu} />}
          </View>
        )}
      </TouchableWithoutFeedback>
      {bottomIcon && <View style={styles.bottomIcon}>{bottomIcon}</View>}
    </SafeAreaView>
  );
};

export default PageTemplate;
