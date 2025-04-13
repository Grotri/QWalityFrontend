import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";

const Login = () => {
  const { navigate } = useAuthNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <GradientPageTemplate
      headerText="Вход в аккаунт"
      onClick={() => navigate("Home")}
      mustScroll={false}
    >
      <View style={styles.wrapper}>
        <View style={styles.fields}>
          <Input
            label="Почта / логин"
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputMode="email"
            maxLength={254}
          />
          <Input
            label="Пароль"
            value={password}
            onChangeText={(text) => setPassword(text)}
            inputMode="text"
            secureTextEntry
          />
        </View>
        <Button color="welcomeBrightBlue" style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Войти</Text>
        </Button>
        <Pressable onPress={() => navigate("ForgotPassword")}>
          <Text style={styles.textUnderlined}>Забыли пароль?</Text>
        </Pressable>
      </View>
    </GradientPageTemplate>
  );
};

export default Login;
