import React, { FC } from "react";
import { Text, View } from "react-native";
import { screenHeight, screenWidth } from "../../../constants/screenSize";
import { usePalette } from "../../../hooks/usePalette";
import Button from "../../atoms/Button";
import Radio from "../../atoms/Radio";
import { getStyles } from "./styles";
import { ISliderCard } from "./types";

const SliderCard: FC<ISliderCard> = ({
  id,
  currentId,
  title,
  description,
  radioLabels,
  price,
  onPress,
}) => {
  const styles = getStyles();
  const palette = usePalette();

  const isSmallHeight = screenHeight < 700;

  return (
    <View style={{ width: screenWidth }} key={id}>
      <View style={[styles.card, { paddingVertical: isSmallHeight ? 16 : 20 }]}>
        <View style={styles.topView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.line} />
          <Text
            style={[
              styles.description,
              {
                fontSize: isSmallHeight ? 18 : 20,
                lineHeight: isSmallHeight ? 22 : 28,
                marginBottom: isSmallHeight ? 20 : 28,
              },
            ]}
          >
            {description}
          </Text>
          <View style={[styles.radios, { gap: isSmallHeight ? 24 : 40 }]}>
            {radioLabels.map((label: string, index: number) => (
              <Radio label={label} isChecked key={index} style={styles.radio} />
            ))}
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.price}>{price} руб. в месяц</Text>
          {currentId !== undefined && currentId === id ? (
            <View style={[styles.btn, { backgroundColor: palette.btnChoosen }]}>
              <Text style={styles.btnText}>Выбрано</Text>
            </View>
          ) : (
            <Button
              color="welcomeBrightBlue"
              style={styles.btn}
              onPress={onPress}
            >
              <Text style={styles.btnText}>Выбрать</Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default SliderCard;
