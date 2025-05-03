import React, { PropsWithChildren, forwardRef, Ref } from "react";
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
import { getStyles } from "./styles";
import Header from "../../molecules/Header";
import useAuthStore from "../../../hooks/useAuthStore";

const GradientPageTemplate = forwardRef(
  (
    {
      children,
      mustScroll = true,
      headerText,
      onHeaderClick,
      underlined = false,
    }: PropsWithChildren<IGradientPageTemplate>,
    scrollRef: Ref<ScrollView>
  ) => {
    const { user } = useAuthStore();
    const styles = getStyles(user.theme);

    return (
      <SafeAreaView style={styles.container}>
        <RadialGradientBg
          screenWidth={screenWidth}
          screenHeight={screenHeight}
        />
        {headerText && (
          <Header
            headerText={headerText}
            onClick={onHeaderClick}
            underlined={underlined}
          />
        )}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {mustScroll ? (
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <View style={styles.scrollContainer}>{children}</View>
          )}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
);

GradientPageTemplate.displayName = "GradientPageTemplate";

export default GradientPageTemplate;
