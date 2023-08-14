import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function _layout() {
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit"
        options={{
          presentation: "modal",
          title: "Edit Profile",
          animation: "slide_from_bottom",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "800",
            color: theme.colors.primary,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="saved"
        options={{
          presentation: "modal",
          title: "Saved Recipe",
          animation: "slide_from_bottom",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "800",
            color: theme.colors.primary,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="myrecipe"
        options={{
          presentation: "modal",
          title: "My Recipe",
          animation: "slide_from_bottom",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "800",
            color: theme.colors.primary,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="liked"
        options={{
          presentation: "modal",
          title: "Liked Recipe",
          animation: "slide_from_bottom",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "800",
            color: theme.colors.primary,
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
