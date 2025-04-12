import React, { FC, PropsWithChildren } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StyleSheet } from "react-native";
import { palette } from "../../../constants/palette";
import { SafeAreaView } from "react-native-safe-area-context";

const PageTemplate: FC<
  PropsWithChildren & {
    mustScroll?: boolean;
    onPress?: () => void;
  }
> = ({ children, mustScroll = true, onPress }) => (
  <SafeAreaView style={styles.container}>
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
  </SafeAreaView>
);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default PageTemplate;
