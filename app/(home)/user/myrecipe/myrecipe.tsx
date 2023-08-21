import { selectCurrentUser } from "@/src/features/auth/authSlice";
import {
  useGetRecipesByUserIdQuery
} from "@/src/features/recipes/recipesApiSlice";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
export default function MyRecipe() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetRecipesByUserIdQuery(user.id);
  useFocusEffect(
    React.useCallback(() => {
      refetch()
    }, [refetch])
  )

  if (isLoading) {
    
    return <Text>Loading...</Text>;
  }

  const RecipeCard = () =>
    data?.recipes.map((recipe) => (
      <View key={recipe.id} className="flex-row justify-between mb-5 ">
        <View className="flex-row gap-3 justify-center">
          <Image
            source={recipe?.photo}
            className="aspect-square w-24 rounded-xl"
          />
          <View className="">
            <Text className="font-bold text-lg">
              {recipe.title.slice(0, 20)}...
            </Text>
            <Text style={{ maxWidth: 200 }}>
              {recipe.description.slice(0, 50)}...
            </Text>
          </View>
        </View>
        <View className="gap-0">
          <IconButton
            icon="pencil-box"
            size={24}
            onPress={() =>
              router.push(`/user/myrecipe/editRecipe/${recipe.id}`)
            }
          />
        </View>
      </View>
    ));

  return (
    <View className="p-5 h-screen bg-white">
      <RecipeCard />
      <StatusBar style="light"  />
    </View>
  );
}
