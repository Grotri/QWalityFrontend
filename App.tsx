import React, { useEffect, useState } from "react";
import { Navigation } from "./src/navigation";
import * as Font from "expo-font";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AppState,
  Platform,
} from "react-native";
import { palette } from "./src/constants/palette";
import * as NavigationBar from "expo-navigation-bar";

const App = () => {
  const [areFontsLoaded, setAreFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        "Segoe-UI-900": require("./assets/fonts/Segoe UI Black.ttf"),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        "Segoe-UI-800": require("./assets/fonts/Segoe UI Bold.ttf"),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        "Segoe-UI-700": require("./assets/fonts/Segoe UI Semibold.ttf"),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        "Segoe-UI-500": require("./assets/fonts/Segoe UI Semilight.ttf"),
      });

      setAreFontsLoaded(true);
    };

    const setupNavigationBar = async () => {
      await NavigationBar.setBehaviorAsync("overlay-swipe");
      await NavigationBar.setVisibilityAsync("hidden");

      const unsubscribeVisibility = NavigationBar.addVisibilityListener(
        ({ visibility }) => {
          if (visibility === "visible") {
            NavigationBar.setVisibilityAsync("hidden");
          }
        }
      );

      const appStateListener = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (nextAppState === "active") {
            NavigationBar.setVisibilityAsync("hidden");
          }
        }
      );

      return () => {
        unsubscribeVisibility.remove();
        appStateListener.remove();
      };
    };

    loadFont();
    
    if (Platform.OS === "android") {
      setupNavigationBar();
    }
  }, []);

  if (!areFontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color={palette.white} />
      </View>
    );
  }

  return <Navigation />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.bg,
  },
});

export default App;
