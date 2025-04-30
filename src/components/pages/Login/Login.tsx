import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { showErrorToast } from "../../../helpers/toast";
import useAuthStore from "../../../hooks/useAuthStore";
import InputPassword from "../../atoms/InputPassword";
import useAccountStore from "../../../hooks/useAccountStore";

const Login = () => {
  const { navigate } = useAuthNavigation();
  const { login } = useAuthStore();
  const { addAccount } = useAccountStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const changePassword = () => {
    if (validate()) {
      login(email.trim(), password.trim(), addAccount);
    } else {
      showErrorToast(EErrors.fields);
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
          <InputPassword
            label="Пароль"
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              setErrors({ ...errors, password: "" });
            }}
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
