import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { ScrollView } from "react-native";
import { CustomTextInput } from "@/components/Themed";
import {
  useDeleteRecipeMutation,
  useGetRecipesByIdQuery,
  useUpdateRecipeMutation,
} from "@/src/features/recipes/recipesApiSlice";
import { Button } from "react-native-paper";

export default function EditRecipePage() {
  const router = useRouter();
  const { recipeId } = useLocalSearchParams();
  const [updateRecipe, { isLoading: Updating }] = useUpdateRecipeMutation();
  const { data, isLoading, refetch } = useGetRecipesByIdQuery(Number(recipeId));
  const [deleteRecipe, {isLoading: isDeleting}] = useDeleteRecipeMutation()
  if (isLoading) console.log("Loading data...");
  const recipe = data?.recipe[0];


  const handleDelete = async (recipeId: number) => {
    try {
      const response = await deleteRecipe(recipeId)
      console.log("🚀 ~ file: [recipeId].tsx:27 ~ handleDelete ~ response:", response)
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      const response = await updateRecipe({
        id: recipeId,
        title: values.title,
        description: values.description,
        photo: values.photo,
      });
      console.log(
        "🚀 ~ file: [recipeId].tsx:30 ~ handleSubmit ~ response:",
        response
      );
      refetch();
      router.push("../");
      ToastAndroid.show("Recipe updated successfully", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Failed updating recipe", ToastAndroid.SHORT);
    }
  };
  return (
    <View className="p-5">
      {recipe && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            title: recipe?.title,
            description: recipe?.description,
            photo: recipe?.photo,
            video: recipe?.video
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
              <CustomTextInput
                mode="outlined"
                label="Video"
                placeholder="Masukkan video..."
                onChangeText={handleChange("video")}
                onBlur={handleBlur("video")}
                value={values.video}
                className="mb-3"
              />
              <Button mode="contained" className="mt-5" onPress={submitForm} loading={Updating ? true : false}>
                Update
              </Button>
              <Button mode="contained" style={{backgroundColor: "red", marginTop: 10}} onPress={() => handleDelete(Number(recipeId))} loading={isDeleting ? true : false}>
                Delete
              </Button>
            </ScrollView>
          )}
        </Formik>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
