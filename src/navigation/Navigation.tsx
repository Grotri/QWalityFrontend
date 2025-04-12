import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { authRoutes, mainRoutes } from "./routes";
import { StyleSheet, StatusBar, View } from "react-native";
import { palette } from "../constants/palette";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useAuthStore from "../hooks/useAuthStore";
import { TypeAuthStackParamList, TypeMainStackParamList } from "./types";
import Subscription from "../components/pages/Subscription";

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator<TypeAuthStackParamList>();
const MainStack = createNativeStackNavigator<TypeMainStackParamList>();

const AuthTabs = () => (
  <AuthStack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      headerShown: false,
    }}
  >
    {authRoutes.map((route) => (
      <AuthStack.Screen key={route.name} {...route} />
    ))}
  </AuthStack.Navigator>
);

const MainTabs = () => {
  const { user } = useAuthStore();
  return (
    <MainStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      {user?.subscription ? (
        mainRoutes.map((route) => (
          <MainStack.Screen key={route.name} {...route} />
        ))
      ) : (
        <RootStack.Screen name={"Subscription"} component={Subscription} />
      )}
    </MainStack.Navigator>
  );
};

export const Navigation = () => {
  const { user } = useAuthStore();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" hidden />
          <RootStack.Navigator
            screenOptions={{
              animation: "slide_from_right",
              headerShown: false,
            }}
          >
            {!user ? (
              <RootStack.Screen name="Auth" component={AuthTabs} />
            ) : (
              <RootStack.Screen name="Main" component={MainTabs} />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
});
