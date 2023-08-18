import { View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useGetRecipesByUserIdQuery } from "@/src/features/recipes/recipesApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/features/auth/authSlice";
import { Text } from "react-native-paper";
import { Image } from "expo-image";
export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const user = useSelector(selectCurrentUser);
  const { data, isLoading } = useGetRecipesByUserIdQuery(user.id);
  if (isLoading) return <Text>Loading...</Text>;

  const RecipeCard = () =>
    data?.recipes.map((recipe) => (
      <View key={recipe.id}>
        <Image source={recipe?.photo} style={{ flex: 1, width: "100%" }} />
        <Text>{recipe.title}</Text>
      </View>
    ));

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <RecipeCard />
      </View>
      <StatusBar style="light" animated />
    </View>
  );
}
