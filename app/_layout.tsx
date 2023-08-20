import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { Slot, SplashScreen, Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { MD3LightTheme, PaperProvider, useTheme } from "react-native-paper";
import { AuthProvider } from "../components/context/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/src/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const themes = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#EFC81A",
    secondary: "#C4C4C4",
    onSurfaceVariant: "#EFC81A",
  },
};

const Root = () => {
  const theme = useTheme();
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
    <Provider store={store}>
      <AuthProvider>
        <PaperProvider theme={themes}>
          <Slot />
        </PaperProvider>
      </AuthProvider>
    </Provider>
  );
};

export default Root;
