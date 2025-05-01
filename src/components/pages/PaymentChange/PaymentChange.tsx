import React from "react";
import { useRoute } from "@react-navigation/native";
import { useCost } from "../../../helpers/useCost";
import useAuthStore from "../../../hooks/useAuthStore";
import Button from "../../atoms/Button";
import { styles } from "./styles";
import { Text, View } from "react-native";
import PageTemplate from "../../templates/PageTemplate";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { showSuccessToast } from "../../../helpers/toast";

const PaymentChange = () => {
  const route = useRoute();
  const { navigate } = useMainNavigation();
  const { setUserField } = useAuthStore();
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
              showSuccessToast("Вы успешно поменяли уровень подписки");
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
