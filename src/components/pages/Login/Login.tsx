import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { emailPattern } from "../../../constants/patterns";
import { showErrorToast } from "../../../helpers/toast";
import useAuthStore from "../../../hooks/useAuthStore";

const Login = () => {
  const { navigate } = useAuthNavigation();
  const { login } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim()
        ? EErrors.required
        : !emailPattern.test(email.trim())
        ? "Введите корректный email"
        : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? "Пароль должен содержать не менее 8 символов"
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const changePassword = () => {
    if (validate()) {
      login(email, password);
    } else {
      showErrorToast("Сначала заполните поля формы");
    }
  };

  return (
    <GradientPageTemplate
      headerText="Вход в аккаунт"
      onHeaderClick={() => navigate("Home", { direction: "backward" })}
      mustScroll={false}
    >
      <View style={styles.wrapper}>
        <View style={styles.fields}>
          <Input
            label="Почта / логин"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
              setErrors({ ...errors, email: "" });
            }}
            inputMode="email"
            maxLength={254}
            errorText={errors.email}
          />
          <Input
            label="Пароль"
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              setErrors({ ...errors, password: "" });
            }}
            secureTextEntry
            errorText={errors.password}
          />
        </View>
        <Button
          color="welcomeBrightBlue"
          style={styles.loginBtn}
          onPress={changePassword}
        >
          <Text style={styles.loginBtnText}>Войти</Text>
        </Button>
        <Button onPress={() => navigate("ForgotPassword")}>
          <Text style={styles.textUnderlined}>Забыли пароль?</Text>
        </Button>
      </View>
    </GradientPageTemplate>
  );
};

export default Login;
