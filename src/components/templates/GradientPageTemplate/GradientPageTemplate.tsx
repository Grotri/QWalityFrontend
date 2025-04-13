import React, { FC, PropsWithChildren } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RadialGradientBg from "../../atoms/RadialGradient";
import { screenHeight, screenWidth } from "../../../constants/screenSize";
import { SafeAreaView } from "react-native-safe-area-context";
import { IGradientPageTemplate } from "./types";
import { styles } from "./styles";
import Header from "../../molecules/Header";

const GradientPageTemplate: FC<PropsWithChildren & IGradientPageTemplate> = ({
  children,
  mustScroll = true,
  headerText,
  onHeaderClick,
  underlined = false,
}) => (
  <SafeAreaView style={styles.container}>
    <RadialGradientBg screenWidth={screenWidth} screenHeight={screenHeight} />
    {headerText && (
      <Header
        headerText={headerText}
        onClick={onHeaderClick}
        underlined={underlined}
      />
    )}
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {mustScroll ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.scrollContainer}>{children}</View>
      )}
    </TouchableWithoutFeedback>
  </SafeAreaView>
);

export default GradientPageTemplate;
