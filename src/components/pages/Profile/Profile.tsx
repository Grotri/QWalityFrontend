import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import Header from "../../molecules/Header";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import PageTemplate from "../../templates/PageTemplate";
import { ProfileIcon } from "../../../../assets/icons";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

const Profile = () => {
  const { navigate } = useMainNavigation();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("admin@factory.com");
  const [code, setCode] = useState<number | null>();
  const [inn, setInn] = useState<string>("11 22 12345 0");

  return (
    <PageTemplate mustScroll={false}>
      <View style={styles.wrapper}>
        {/* TO-DO: change profile navigation */}
        <Header headerText="Профиль" onClick={() => navigate("Profile")} />
        <View style={styles.profileWrapper}>
          <ProfileIcon />
          <View style={styles.card}>
            <View>
              <Text style={styles.cardPointTitle}>
                Электронная почта / логин
              </Text>
              {!isEditMode ? (
                <Text style={styles.cardPointData}>{email}</Text>
              ) : (
                <Input
                  value={email}
                  onChangeText={(val) => setEmail(val)}
                  customInputStyles={styles.input}
                  inputMode="email"
                  maxLength={254}
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
                <Text style={styles.cardPointData}>{inn}</Text>
              ) : (
                <Input
                  value={inn}
                  onChangeText={(val) => setInn(val)}
                  customInputStyles={styles.input}
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
              <Button style={styles.btn} color="blue">
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
                  value={code?.toString()}
                  onChangeText={(text) => setCode(text === "" ? null : +text)}
                  inputMode="numeric"
                  keyboardType="numeric"
                  maxLength={6}
                  customStyles={styles.confirmationInputWrapper}
                  customInputStyles={styles.confirmationInput}
                  customLabelStyles={styles.confirmationInputLabel}
                />
                <Button style={styles.codeBtn} color="darkBlue">
                  <Text style={styles.codeBtnText}>Отправить код</Text>
                </Button>
              </View>
              <Button
                style={styles.btn}
                color="blue"
                onPress={() => setIsEditMode(false)}
              >
                <Text style={styles.btnText}>Сохранить изменения</Text>
              </Button>
              <Button
                style={styles.btn}
                color="blue"
                onPress={() => setIsEditMode(false)}
              >
                <Text style={styles.btnText}>Отменить</Text>
              </Button>
              <View style={styles.supportTextWrapper}>
                <Text style={styles.supportText}>Нет доступа к почте?</Text>
                <Text
                  style={[styles.supportText, styles.supportTextUnderlined]}
                >
                  Обратитесь в тех. поддержку
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </PageTemplate>
  );
};

export default Profile;
