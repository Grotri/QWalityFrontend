import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { IMenuItem } from "./types";
import { getStyles } from "./styles";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import useAuthStore from "../../../hooks/useAuthStore";

const MenuItem: FC<IMenuItem> = ({
  index,
  icon: Icon,
  title,
  isRoundBorder = false,
  isExpanded,
  onPress,
}) => {
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);

  const collapsedTop = 18;
  const expandedTop = (index + 1) * 55 + 18;

  const animation = useAnimatedStyle(() => {
    return {
      top: withSpring(isExpanded ? expandedTop : collapsedTop),
    };
  });

  return (
    <Animated.View
      style={[styles.wrapper, isRoundBorder && styles.rounded, animation]}
    >
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Icon />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MenuItem;
