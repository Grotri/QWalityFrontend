import React, { useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { styles } from "./styles";
import SliderCard from "../../organisms/SliderCard";
import Button from "../../atoms/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../assets/icons";
import { screenWidth } from "../../../constants/screenSize";
import useAuthStore from "../../../hooks/useAuthStore";
import { slidersInfo } from "../../../constants/slider";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { showSuccessToast } from "../../../helpers/toast";

const SubscriptionChange = () => {
  const { navigate } = useMainNavigation();
  const { user, setUserField, logout } = useAuthStore();
  const [currentSlide, setCurrentSlide] = useState<number>(
    user.subscription ? +user.subscription : 0
  );
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentSlide(index);
    }
  };

  return (
    <GradientPageTemplate
      headerText="Выберите уровень подписки"
      onHeaderClick={() => navigate("Profile", { direction: "backward" })}
      mustScroll={false}
    >
      <View style={styles.wrapper}>
        <View style={styles.flatWrapper}>
          {currentSlide > 0 && (
            <ArrowLeftIcon
              style={styles.leftIcon}
              onClick={() => scrollToIndex(currentSlide - 1)}
            />
          )}
          <FlatList
            ref={flatListRef}
            data={slidersInfo}
            renderItem={({ item }) => (
              <SliderCard
                id={item.id}
                currentId={user.subscription ? +user.subscription : undefined}
                title={item.title}
                description={item.description}
                radioLabels={item.radioLabels}
                price={item.price}
                onPress={() => {
                  setUserField("subscription", item.id.toString());
                  navigate("Profile", { direction: "backward" });
                  showSuccessToast("Вы успешно поменяли уровень подписки");
                }}
              />
            )}
            keyExtractor={({ id }) => id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEnabled={false}
            initialScrollIndex={currentSlide}
            getItemLayout={(_, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
          />
          {currentSlide < slidersInfo.length - 1 && (
            <ArrowRightIcon
              style={styles.rightIcon}
              onClick={() => scrollToIndex(currentSlide + 1)}
            />
          )}
        </View>
        <View style={styles.dots}>
          {slidersInfo.map(({ id }) => (
            <View
              key={id}
              style={id === currentSlide ? styles.activeDot : styles.dot}
            />
          ))}
        </View>
        <Button color="welcomeBlue" style={styles.cancelBtn} onPress={logout}>
          <Text style={styles.cancelBtnText}>Отменить подписку</Text>
        </Button>
      </View>
    </GradientPageTemplate>
  );
};

export default SubscriptionChange;
