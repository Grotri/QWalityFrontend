import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import Header from "../../molecules/Header";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { CheckIcon } from "../../../../assets/icons";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";
import useAuthStore from "../../../hooks/useAuthStore";
import uuid from "react-native-uuid";

const Registration = () => {
  const { navigate } = useAuthNavigation();
  const { setUser } = useAuthStore();

  const [inn, setInn] = useState<number | null>();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<number | null>();
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const register = () => {
    setUser({
      id: uuid.v4(),
      inn: inn ? inn.toString() : "",
      email,
      password,
    });
  };

  return (
    <GradientPageTemplate>
      <View style={styles.wrapper}>
        <Header headerText="Регистрация" onClick={() => navigate("Home")} />
        <View style={styles.fields}>
          <Input
            label="ИНН"
            value={inn?.toString()}
            onChangeText={(text) => setInn(text === "" ? null : +text)}
            inputMode="numeric"
            maxLength={12}
            keyboardType="numeric"
          />
          <Input
            label="Почта"
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputMode="email"
            maxLength={254}
          />
          <View style={styles.confirmationWrapper}>
            <Input
              label="Код подтверждения"
              value={code?.toString()}
              onChangeText={(text) => setCode(text === "" ? null : +text)}
              inputMode="numeric"
              keyboardType="numeric"
              maxLength={6}
              customStyles={styles.confirmationInput}
            />
            <Button style={styles.codeBtn} color="blueTransparent">
              <Text style={styles.codeBtnText}>Отправить код</Text>
            </Button>
          </View>
          <Input
            label="Пароль"
            value={password}
            onChangeText={(text) => setPassword(text)}
            inputMode="text"
            secureTextEntry
          />
        </View>
        <Button
          color="welcomeBrightBlue"
          style={styles.createBtn}
          onPress={register}
        >
          <Text style={styles.createBtnText}>Создать аккаунт</Text>
        </Button>
        <View style={styles.checkboxWrapper}>
          <Pressable
            onPress={() => setIsChecked(!isChecked)}
            style={styles.checkbox}
          >
            <View style={styles.checkboxContainer}>
              {isChecked && <CheckIcon />}
            </View>
            <Text style={styles.checkboxText}>
              Я принимаю{" "}
              <Text style={styles.checkboxTextUnderlined}>
                условия пользовательского соглашения
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </GradientPageTemplate>
  );
};

export default Registration;
