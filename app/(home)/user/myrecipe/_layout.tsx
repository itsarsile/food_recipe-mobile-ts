import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

export default function MyRecipeLayout() {
  return (
    <Stack>
      <Stack.Screen name="myrecipe" options={{ headerShown: false }} />
      <Stack.Screen
        name="editRecipe/[recipeId]"
        options={{ presentation: "containedModal", headerShown: false }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
