import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import { View } from "react-native";
import { styles } from "./styles";

const Main = () => {
  return (
    <PageTemplate hasMenu>
      <View style={styles.wrapper}></View>
    </PageTemplate>
  );
};

export default Main;
