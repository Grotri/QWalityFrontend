import React from "react";
import { useRoute } from "@react-navigation/native";
import { useCost } from "../../../helpers/useCost";
import useAuthStore from "../../../hooks/useAuthStore";
import Button from "../../atoms/Button";
import { styles } from "./styles";
import { Text, View } from "react-native";
import PageTemplate from "../../templates/PageTemplate";
import { useSubscriptionNavigation } from "../../../hooks/useTypedNavigation";
import { showSuccessToast } from "../../../helpers/toast";

const Payment = () => {
  const route = useRoute();
  const { navigate } = useSubscriptionNavigation();
  const { setUserField } = useAuthStore();
  const { sliderId } = route.params as { sliderId: string };
  const subscriptionCost = useCost(sliderId || "0");

  return (
    <PageTemplate
      headerText="Оплата подписки"
      onHeaderClick={() => navigate("Subscription", { direction: "backward" })}
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
              showSuccessToast("Подписка успешно оплачена");
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

export default Payment;
