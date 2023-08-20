import { selectCurrentUser } from "@/src/features/auth/authSlice";
import {
  useGetRecipesByUserIdQuery,
  useUpdateRecipeMutation,
} from "@/src/features/recipes/recipesApiSlice";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
export default function MyRecipe() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetRecipesByUserIdQuery(user.id);
  const [updateRecipes, { isLoading: updateLoading }] =
    useUpdateRecipeMutation();

  if (isLoading) return <Text>Loading...</Text>;

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
          <IconButton icon="delete" size={24} iconColor="red" />
        </View>
      </View>
    ));

  return (
    <View className="p-5 h-screen bg-white">
      <RecipeCard />
      {/* {recipeId && (
        <Modal visible={visible} onDismiss={closeModal}>
          <View className="bg-white mx-auto w-10/12 h-[90%] rounded-tr-2xl rounded-tl-2xl p-5">
            <Title>Update Recipe</Title>
            <Divider className="my-3" />
            <Formik
              onSubmit={handleSubmit}
              initialValues={{
                title: data?.recipes.find((r) => r.id === recipeId)?.title,
                description: data?.recipes.find((r) => r.id === recipeId)
                  ?.description,
                photo: data?.recipes.find((r) => r.id === recipeId)?.photo,
              }}
            >
              {({ handleChange, handleBlur, submitForm, values }) => (
                <ScrollView>
                  <CustomTextInput
                    mode="outlined"
                    label="Title"
                    placeholder="Judul resep..."
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                    className="mb-3"
                  />
                  <CustomTextInput
                    mode="outlined"
                    label="Description"
                    multiline
                    numberOfLines={10}
                    style={{ maxHeight: 200 }}
                    placeholder="Deskripsikan bahan dan tahapan..."
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    className="mb-3"
                  />
                  <CustomTextInput
                    mode="outlined"
                    label="Photo"
                    placeholder="Masukkan gambar..."
                    onChangeText={handleChange("photo")}
                    onBlur={handleBlur("photo")}
                    value={values.photo}
                    className="mb-3"
                  />
                  <Button
                    mode="contained"
                    className="mt-5"
                    onPress={handleSubmit}
                  >
                    Update
                  </Button>
                </ScrollView>
              )}
            </Formik>
          </View>
        </Modal>
      )} */}
      <StatusBar style="light" animated />
    </View>
  );
}
