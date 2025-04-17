import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import HomeListPoint from "../../atoms/HomeListPoint/HomeListPoint";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { screenWidth } from "../../../constants/screenSize";
import { LogoIcon, SolarPanelIcon, WaveIcon } from "../../../../assets/icons";
import Button from "../../atoms/Button";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";

let hasScrolledOnce = false;

const Home = () => {
  const { navigate } = useAuthNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasScrolledOnce) return;
    hasScrolledOnce = true;

    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });

      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }, 1000);

      setTimeout(() => {
        setIsVisible(true);
      }, 5000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    scrollRef.current?.scrollToEnd({ animated: true });

    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      setIsVisible(false);
    }, 1000);
  }, [isVisible]);

  return (
    <GradientPageTemplate ref={scrollRef}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text
            style={[styles.headerTitle, screenWidth <= 360 && { fontSize: 20 }]}
          >
            Добро пожаловать в QWality
          </Text>
          <LogoIcon width={screenWidth * 0.25} />
        </View>
        <View style={styles.line} />
        <Text style={styles.welcomeText}>
          Многофункциональное приложение для отслеживания дефектов солнечных
          панелей
        </Text>
        <View style={styles.waveWrapper}>
          <View style={[styles.solarIcon, { marginBottom: 52 }]}>
            <SolarPanelIcon width={screenWidth * 0.33} />
          </View>
          <View style={styles.waveIcon}>
            <WaveIcon />
          </View>
        </View>
        <View style={styles.list}>
          <HomeListPoint text="Точность до 99%" />
          <HomeListPoint text="Отчетность в реальном времени" />
          <HomeListPoint text="Многоуровневый доступ по ролям" />
          <HomeListPoint text="Тонкая настройка нейросети" />
        </View>
        <View style={styles.btns}>
          <Text style={styles.improveText}>
            Улучшите свое производство с QWality
          </Text>
          <Button
            color="welcomeBrightBlue"
            style={styles.brightBlueBtn}
            onPress={() => navigate("Registration")}
          >
            <Text style={styles.brightBlueBtnText}>Зарегистрироваться</Text>
          </Button>
          <Button
            color="welcomeBlue"
            style={styles.blueBtn}
            onPress={() => navigate("Login")}
          >
            <Text style={styles.blueBtnText}>Уже есть аккаунт? Войти</Text>
          </Button>
        </View>
      </View>
    </GradientPageTemplate>
  );
};

export default Home;
