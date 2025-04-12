import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import HomeListPoint from "../../atoms/HomeListPoint/HomeListPoint";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { screenWidth } from "../../../constants/screenSize";
import { LogoIcon, SolarPanelIcon, WaveIcon } from "../../../../assets/icons";
import Button from "../../atoms/Button";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";

const Home = () => {
  const { navigate } = useAuthNavigation();

  return (
    <GradientPageTemplate>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Добро пожаловать в QWality</Text>
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
