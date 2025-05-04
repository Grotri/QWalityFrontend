import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { showSuccessToast } from "../../../helpers/toast";
import { useCost } from "../../../helpers/useCost";
import useAuthStore from "../../../hooks/useAuthStore";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";

const PaymentChange = () => {
  const route = useRoute();
  const { setUserField } = useAuthStore();
  const styles = getStyles();
  const { navigate } = useMainNavigation();
  const { sliderId } = route.params as { sliderId: string };
  const subscriptionCost = useCost(sliderId || "0");

  return (
    <PageTemplate
      headerText="Оплата подписки"
      onHeaderClick={() =>
        navigate("SubscriptionChange", { direction: "backward" })
      }
      mustScroll={false}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Вы собираетесь оплатить подписку за {subscriptionCost} рублей
        </Text>
        {sliderId && (
          <Button
            onPress={() => {
              setUserField("subscription", sliderId);
              navigate("Profile", { direction: "backward" });
              showSuccessToast("Подписка успешно оплачена");
              setTimeout(() => {
                showSuccessToast("Вы успешно поменяли уровень подписки");
              }, 2000);
            }}
            style={styles.btn}
            color="blue"
          >
            <Text style={styles.btnText}>Оплатить</Text>
          </Button>
        )}
      </View>
    </PageTemplate>
  );
};

export default PaymentChange;
