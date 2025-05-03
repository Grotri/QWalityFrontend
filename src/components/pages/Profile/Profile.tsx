import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ProfileIcon } from "../../../../assets/icons";
import { EErrors } from "../../../constants/errors";
import { emailPattern, innPattern } from "../../../constants/patterns";
import { ERoles } from "../../../constants/roles";
import { screenHeight } from "../../../constants/screenSize";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../../helpers/toast";
import useAuthStore from "../../../hooks/useAuthStore";
import { usePalette } from "../../../hooks/usePalette";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { initialUser, IUser } from "../../../model/user";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";
import { IErrors, initialErrors } from "./types";

const Profile = () => {
  const { navigate } = useMainNavigation();
  const { user, setUser } = useAuthStore();
  const styles = getStyles();
  const palette = usePalette();
  const [userInfo, setUserInfo] = useState<IUser>({ ...initialUser });
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [code, setCode] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const cancel = () => {
    setIsEditMode(false);
    setUserInfo({ ...user });
    setCode("");
    setErrors({ ...initialErrors });
  };

  const validate = (): boolean => {
    const newErrors: IErrors = {
      login: !userInfo.login.trim()
        ? EErrors.required
        : !emailPattern.test(userInfo.login.trim())
        ? EErrors.email
        : "",
      code: !code.trim() ? EErrors.required : "",
      inn:
        !userInfo.inn || !userInfo.inn.trim()
          ? EErrors.required
          : !innPattern.test(userInfo.inn.trim())
          ? EErrors.inn
          : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const saveChanges = () => {
    const newProfile: IUser = {
      ...userInfo,
      login: userInfo.login.trim(),
      inn: userInfo.inn?.trim(),
    };
    if (JSON.stringify(user) !== JSON.stringify(newProfile)) {
      if (validate()) {
        setIsEditMode(false);
        setCode("");
        setUser(newProfile);
        showSuccessToast("Данные профиля изменены");
      } else {
        showErrorToast(EErrors.fields);
      }
    } else {
      showInfoToast(EErrors.noChanges);
    }
  };

  useEffect(() => {
    setUserInfo({ ...user });
  }, [user]);

  return (
    <PageTemplate
      mustScroll={screenHeight < 700 && isEditMode}
      headerText="Профиль"
      onHeaderClick={() => navigate("Main", { direction: "backward" })}
    >
      <View style={styles.profileWrapper}>
        <ProfileIcon />
        <View style={styles.card}>
          <View>
            <Text style={styles.cardPointTitle}>Электронная почта / логин</Text>
            {!isEditMode ? (
              <Text style={styles.cardPointData}>{userInfo.login}</Text>
            ) : (
              <Input
                value={userInfo.login}
                onChangeText={(email) => {
                  setUserInfo({ ...userInfo, login: email });
                  setErrors({ ...errors, login: "" });
                }}
                customInputStyles={styles.input}
                inputMode="email"
                maxLength={254}
                cursorColor={palette.subTextMainScreenPopup}
                errorText={errors.login}
              />
            )}
          </View>
          <View>
            <Text style={styles.cardPointTitle}>Роль</Text>
            <Text style={styles.cardPointData}>
              {ERoles[user.role as keyof typeof ERoles]}
            </Text>
          </View>
          {user.role === "owner" && (
            <View>
              <Text style={styles.cardPointTitle}>ИНН</Text>
              {!isEditMode ? (
                <Text style={styles.cardPointData}>{userInfo.inn}</Text>
              ) : (
                <Input
                  value={userInfo.inn || ""}
                  onChangeText={(inn) => {
                    setUserInfo({ ...userInfo, inn });
                    setErrors({ ...errors, inn: "" });
                  }}
                  maxLength={12}
                  inputMode="numeric"
                  keyboardType="numeric"
                  customInputStyles={styles.input}
                  cursorColor={palette.subTextMainScreenPopup}
                  errorText={errors.inn}
                />
              )}
            </View>
          )}
        </View>
        {!isEditMode ? (
          <>
            {user.role === "owner" && (
              <Button
                style={[styles.btn, { marginTop: 13 }]}
                color="blue"
                onPress={() => setIsEditMode(true)}
              >
                <Text style={styles.btnText}>Изменить данные</Text>
              </Button>
            )}
            {user.role === "owner" && (
              <Button
                style={styles.btn}
                color="blue"
                onPress={() => navigate("SubscriptionChange")}
              >
                <Text style={styles.btnText}>Управлять подпиской</Text>
              </Button>
            )}
            {["owner", "administrator"].includes(user.role) && (
              <Button
                style={styles.btn}
                color="blue"
                onPress={() => navigate("Admin")}
              >
                <Text style={styles.btnText}>Админ панель</Text>
              </Button>
            )}
          </>
        ) : (
          <>
            <View style={styles.confirmationWrapper}>
              <Input
                label="Код подтверждения"
                value={code}
                onChangeText={(code) => {
                  setCode(code);
                  setErrors({ ...errors, code: "" });
                }}
                inputMode="numeric"
                keyboardType="numeric"
                maxLength={6}
                cursorColor={palette.subTextMainScreenPopup}
                customStyles={styles.confirmationInputWrapper}
                customInputStyles={styles.confirmationInput}
                customLabelStyles={styles.confirmationInputLabel}
                errorText={errors.code}
              />
              <Button style={styles.codeBtn} color="darkBlue">
                <Text style={styles.codeBtnText}>Отправить код</Text>
              </Button>
            </View>
            <Button style={styles.btn} color="blue" onPress={saveChanges}>
              <Text style={styles.btnText}>Сохранить изменения</Text>
            </Button>
            <Button style={styles.btn} color="blue" onPress={cancel}>
              <Text style={styles.btnText}>Отменить</Text>
            </Button>
            <View style={styles.supportTextWrapper}>
              <Text style={styles.supportText}>Нет доступа к почте?</Text>
              <Button
                onPress={() => alert("Обратиться в поддержку пока невозможно.")}
              >
                <Text
                  style={[styles.supportText, styles.supportTextUnderlined]}
                >
                  Обратитесь в тех. поддержку
                </Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </PageTemplate>
  );
};

export default Profile;
