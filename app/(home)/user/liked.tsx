import { selectCurrentUser } from "@/src/features/auth/authSlice";
import { useDeleteLikedRecipesMutation, useGetLikedRecipesQuery } from "@/src/features/like/likeApiSlice";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, ToastAndroid, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
export default function LikedRecipe() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetLikedRecipesQuery(user.id)
  const [deleteLikedRecipes, {isLoading:isDeleting}] = useDeleteLikedRecipesMutation()
  useFocusEffect(
    React.useCallback(() => {
      refetch()
    }, [refetch])
    )

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
    console.log("🚀 ~ file: saved.tsx:20 ~ SavedRecipe ~ data:", data)
  const handleDelete =  async (saveId: number) => {
    try {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this recipe?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              // User confirmed, proceed with deletion
              await deleteLikedRecipes(saveId);
              refetch();
              ToastAndroid.show("Recipe deleted", ToastAndroid.SHORT);
            }
          }
        ],
        { cancelable: true }
      );
    } catch (error) {
      ToastAndroid.show("Error deleting recipe", ToastAndroid.SHORT)
    }
  }

  const RecipeCard = () =>
    data?.likedRecipes.map((recipe) => (
      <View key={recipe.recipeId} className="flex-row justify-between mb-5 ">
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
            icon="delete"
            size={24}
            iconColor="red"
            onPress={() => handleDelete(recipe.likedId)}
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
