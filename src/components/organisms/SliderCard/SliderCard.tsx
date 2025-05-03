import React, { FC } from "react";
import { ISliderCard } from "./types";
import { Text, View } from "react-native";
import { getStyles } from "./styles";
import Radio from "../../atoms/Radio";
import Button from "../../atoms/Button";
import { screenHeight, screenWidth } from "../../../constants/screenSize";
import useAuthStore from "../../../hooks/useAuthStore";
import { usePalette } from "../../../hooks/usePalette";

const SliderCard: FC<ISliderCard> = ({
  id,
  currentId,
  title,
  description,
  radioLabels,
  price,
  onPress,
}) => {
  const { user } = useAuthStore();
  const styles = getStyles(user.theme);
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
            <View style={[styles.btn, { backgroundColor: palette.blue }]}>
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
