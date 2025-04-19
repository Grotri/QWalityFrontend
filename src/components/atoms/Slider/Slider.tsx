import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { TooltipIcon } from "../../../../assets/icons";
import { palette } from "../../../constants/palette";
import { Slider as ReactSlider } from "@miblanchard/react-native-slider";
import { screenWidth } from "../../../constants/screenSize";

const Slider = () => {
  const initialConfidence = 0.75;

  const sliderWidth = screenWidth - 54 * 2;
  const tooltipWidth = 39;
  const thumbWidth = 15;

  const [confidence, setConfidence] = useState<number>(initialConfidence);

  const percentageOffset =
    confidence * (sliderWidth - thumbWidth) + thumbWidth / 2 - tooltipWidth / 2;

  return (
    <View style={styles.sliderWrapper}>
      <ReactSlider
        containerStyle={styles.slider}
        trackStyle={styles.sliderTrack}
        thumbStyle={styles.sliderThumb}
        value={initialConfidence}
        onValueChange={(val) => setConfidence(+val[0].toFixed(2))}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        trackClickable={true}
        minimumTrackTintColor={palette.textFieldInFolderBg}
        maximumTrackTintColor="#3154AC"
        thumbTintColor="#D9D9D9"
      />
      <View
        style={[styles.tooltipWrapper, { top: 28, left: percentageOffset }]}
      >
        <TooltipIcon />
        <Text style={styles.tooltipText}>
          {+(confidence * 100).toFixed(0)}%
        </Text>
      </View>
    </View>
  );
};

export default Slider;
