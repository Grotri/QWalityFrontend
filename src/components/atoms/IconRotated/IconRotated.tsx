import React, { FC, useEffect } from "react";
import { IIconRotated } from "./types";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const IconRotated: FC<IIconRotated> = ({ icon, rotation, isActive }) => {
  useEffect(() => {
    rotation.value = withTiming(isActive ? 1 : 0);
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotation.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return <Animated.View style={animatedStyle}>{icon}</Animated.View>;
};

export default IconRotated;
