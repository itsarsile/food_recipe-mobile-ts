import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { AuthProvider } from "../components/context/AuthContext";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#EFC81A",
    secondary: "#C4C4C4",
    onSurfaceVariant: "#EFC81A",
  },
};

const Root = () => {
  const [fontsLoaded] = useFonts({
    AirBnB: require("@/assets/fonts/AirbnbCereal_W_Bk.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <RootLayoutNav />
      </PaperProvider>
    </AuthProvider>
  );
};

export default Root;

const RootLayoutNav = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="register" options={{ headerShown: true }} />
      <Stack.Screen name="(home)" />
    </Stack>
  );
};
