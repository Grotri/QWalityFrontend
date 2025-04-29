import React, { useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { styles } from "./styles";
import SliderCard from "../../organisms/SliderCard";
import Button from "../../atoms/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../assets/icons";
import { screenWidth } from "../../../constants/screenSize";
import useAuthStore from "../../../hooks/useAuthStore";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { showErrorToast, showSuccessToast } from "../../../helpers/toast";
import useCamerasStore from "../../../hooks/useCamerasStore";
import useAccountStore from "../../../hooks/useAccountStore";
import {
  accountLimits,
  cameraLimits,
  subscriptions,
} from "../../../constants/subscriptions";

const SubscriptionChange = () => {
  const { navigate } = useMainNavigation();
  const { user, setUserField, logout } = useAuthStore();
  const { cameras } = useCamerasStore();
  const { accounts } = useAccountStore();
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

  const handleChangeSubscription = (sliderId: string) => {
    const camerasLimit = cameraLimits[sliderId];
    const accountLimit = accountLimits[sliderId];
    if (accountLimit < accounts.length) {
      showErrorToast(
        "Вы не можете перейти на этот тариф, так как у вас больше суб-аккаунтов, чем в лимите"
      );
    } else if (camerasLimit < cameras.length) {
      showErrorToast(
        "Вы не можете перейти на этот тариф, так как у вас больше камер, чем в лимите"
      );
    } else {
      setUserField("subscription", sliderId);
      navigate("Profile", { direction: "backward" });
      showSuccessToast("Вы успешно поменяли уровень подписки");
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
            data={subscriptions}
            renderItem={({ item }) => (
              <SliderCard
                id={item.id}
                currentId={user.subscription ? +user.subscription : undefined}
                title={item.title}
                description={item.description}
                radioLabels={item.radioLabels}
                price={item.price}
                onPress={() => handleChangeSubscription(item.id.toString())}
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
          {currentSlide < subscriptions.length - 1 && (
            <ArrowRightIcon
              style={styles.rightIcon}
              onClick={() => scrollToIndex(currentSlide + 1)}
            />
          )}
        </View>
        <View style={styles.dots}>
          {subscriptions.map(({ id }) => (
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
