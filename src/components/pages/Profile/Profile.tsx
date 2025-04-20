import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import PageTemplate from "../../templates/PageTemplate";
import { ProfileIcon } from "../../../../assets/icons";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { palette } from "../../../constants/palette";
import useAuthStore, { initialUser, IUser } from "../../../hooks/useAuthStore";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { emailPattern } from "../../../constants/patterns";
import { showErrorToast, showSuccessToast } from "../../../helpers/toast";
import { screenHeight } from "../../../constants/screenSize";

const Profile = () => {
  const { navigate } = useMainNavigation();
  const { user, setUser } = useAuthStore();
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
      email: !userInfo.email.trim()
        ? EErrors.required
        : !emailPattern.test(userInfo.email.trim())
        ? EErrors.email
        : "",
      code: !code.trim() ? EErrors.required : "",
      inn: !userInfo.inn
        ? EErrors.required
        : userInfo.inn.length !== 10 && userInfo.inn.length !== 12
        ? EErrors.inn
        : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const saveChanges = () => {
    if (validate()) {
      setIsEditMode(false);
      setCode("");
      setUser({ ...userInfo });
      showSuccessToast("Данные профиля изменены");
    } else {
      showErrorToast(EErrors.fields);
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
              <Text style={styles.cardPointData}>{userInfo.email}</Text>
            ) : (
              <Input
                value={userInfo.email}
                onChangeText={(email) => {
                  setUserInfo({ ...userInfo, email });
                  setErrors({ ...errors, email: "" });
                }}
                customInputStyles={styles.input}
                inputMode="email"
                maxLength={254}
                cursorColor={palette.subTextMainScreenPopup}
                errorText={errors.email}
              />
            )}
          </View>
          <View>
            <Text style={styles.cardPointTitle}>Роль</Text>
            <Text style={styles.cardPointData}>Владелец</Text>
          </View>
          <View>
            <Text style={styles.cardPointTitle}>ИНН</Text>
            {!isEditMode ? (
              <Text style={styles.cardPointData}>{userInfo.inn}</Text>
            ) : (
              <Input
                value={userInfo.inn}
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
        </View>
        {!isEditMode ? (
          <>
            <Button
              style={[styles.btn, { marginTop: 13 }]}
              color="blue"
              onPress={() => setIsEditMode(true)}
            >
              <Text style={styles.btnText}>Изменить данные</Text>
            </Button>
            <Button
              style={styles.btn}
              color="blue"
              onPress={() => navigate("SubscriptionChange")}
            >
              <Text style={styles.btnText}>Управлять подпиской</Text>
            </Button>
            <Button
              style={styles.btn}
              color="blue"
              onPress={() => navigate("Admin")}
            >
              <Text style={styles.btnText}>Админ панель</Text>
            </Button>
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
