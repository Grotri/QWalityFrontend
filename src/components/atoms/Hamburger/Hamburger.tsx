import React, { FC, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { IHamburger } from "./types";
import { getStyles } from "./styles";
import useAuthStore from "../../../hooks/useAuthStore";

const Hamburger: FC<IHamburger> = ({ active }) => {
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);
  const progress = useSharedValue(0);

  useEffect(() => {
    const next = active ? 1 : 0;
    progress.value = withTiming(next, { duration: 300 });
  }, [active]);

  const topBarStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(progress.value * 8) },
      { rotateZ: `${progress.value * 45}deg` },
    ],
  }));

  const middleBarStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1 - progress.value),
  }));

  const bottomBarStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(-progress.value * 8) },
      { rotateZ: `${-progress.value * 45}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, topBarStyle]} />
      <Animated.View style={[styles.bar, middleBarStyle]} />
      <Animated.View style={[styles.bar, bottomBarStyle]} />
    </View>
  );
};

export default Hamburger;
