import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { authRoutes, mainRoutes } from "./routes";
import { StyleSheet, StatusBar, View, Platform } from "react-native";
import { palette } from "../constants/palette";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useAuthStore from "../hooks/useAuthStore";
import { TypeAuthStackParamList, TypeMainStackParamList } from "./types";
import Subscription from "../components/pages/Subscription";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toasts } from "@backpackapp-io/react-native-toast";

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator<TypeAuthStackParamList>();
const MainStack = createNativeStackNavigator<TypeMainStackParamList>();

const AuthTabs = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    {authRoutes.map(({ name, component }) => (
      <AuthStack.Screen
        key={name}
        name={name}
        component={component}
        options={({ route }) => ({
          animation:
            route.params?.direction === "backward"
              ? "slide_from_left"
              : "slide_from_right",
        })}
      />
    ))}
  </AuthStack.Navigator>
);

const MainTabs = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    {mainRoutes.map(({ name, component }) => (
      <MainStack.Screen
        key={name}
        name={name}
        component={component}
        options={({ route }) => ({
          animation:
            route.params?.direction === "backward"
              ? "slide_from_left"
              : "slide_from_right",
        })}
      />
    ))}
  </MainStack.Navigator>
);

export const Navigation = () => {
  const { user } = useAuthStore();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container}>
          <NavigationContainer>
            <StatusBar
              barStyle="light-content"
              hidden={Platform.OS !== "ios"}
            />
            <RootStack.Navigator
              screenOptions={{
                animation: "slide_from_right",
                headerShown: false,
              }}
            >
              {!user.id ? (
                <RootStack.Screen name="AuthTabs" component={AuthTabs} />
              ) : user.subscription ? (
                <RootStack.Screen name="MainTabs" component={MainTabs} />
              ) : (
                <RootStack.Screen
                  name="Subscription"
                  component={Subscription}
                />
              )}
            </RootStack.Navigator>
          </NavigationContainer>
        </View>
        <Toasts
          globalAnimationType="spring"
          globalAnimationConfig={{
            duration: 300,
            flingPositionReturnDuration: 100,
          }}
          overrideDarkMode={false}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
});
