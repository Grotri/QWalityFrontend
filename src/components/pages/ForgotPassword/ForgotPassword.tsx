import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import Header from "../../molecules/Header";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";

const ForgotPassword = () => {
  const { navigate } = useAuthNavigation();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<number | null>();
  const [password, setPassword] = useState<string>("");

  return (
    <GradientPageTemplate>
      <View style={styles.wrapper}>
        <Header
          headerText="Восстановление пароля"
          onClick={() => navigate("Login")}
        />
        <View style={styles.fields}>
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
            label="Новый пароль"
            value={password}
            onChangeText={(text) => setPassword(text)}
            inputMode="text"
            secureTextEntry
          />
        </View>
        <Button color="welcomeBrightBlue" style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Изменить пароль</Text>
        </Button>
      </View>
    </GradientPageTemplate>
  );
};

export default ForgotPassword;
