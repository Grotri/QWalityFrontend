import React, { FC, PropsWithChildren } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../molecules/Header";
import { IPageTemplate } from "./types";
import { styles } from "./styles";

const PageTemplate: FC<PropsWithChildren & IPageTemplate> = ({
  children,
  mustScroll = true,
  onPress,
  headerText,
  onClick,
  underlined = false,
  bottomIcon,
}) => (
  <SafeAreaView style={styles.container}>
    <Header headerText={headerText} onClick={onClick} underlined={underlined} />
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        if (onPress) {
          onPress();
        }
      }}
    >
      {mustScroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          nestedScrollEnabled
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.scrollContainer}>{children}</View>
      )}
    </TouchableWithoutFeedback>
    {bottomIcon && <View style={styles.bottomIcon}>{bottomIcon}</View>}
  </SafeAreaView>
);

export default PageTemplate;
