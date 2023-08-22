import { CustomTextInput } from "@/components/Themed";
import { selectCurrentUser } from "@/src/features/auth/authSlice";
import {
  useCreateMutation,
  useGetRecipesQuery,
} from "@/src/features/recipes/recipesApiSlice";
import { Formik } from "formik";
import React, { useState } from "react";
import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker'


const AddRecipe = () => {
  const [image, setImage] = useState(null);
  console.log("🚀 ~ file: addrecipe.tsx:16 ~ AddRecipe ~ image:", image)
  const [create, { isLoading }] = useCreateMutation();
  // @ts-ignore
  const user = useSelector(selectCurrentUser);
  console.log("🚀 ~ file: addrecipe.tsx:17 ~ AddRecipe ~ user:", user);
  const theme = useTheme();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSubmit = async (values: any) => {
    try {
      const response = await create(values);
      ToastAndroid.show("Recipe created successfully", ToastAndroid.SHORT);
      console.log(
        "🚀 ~ file: addrecipe.tsx:29 ~ handleSubmit ~ response:",
        response
      );
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Failed creating recipe", ToastAndroid.SHORT);
    }
  };
  return (
    <ScrollView>
      <View className="justify-center items-center min-h-screen">
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          Add Your Recipe
        </Text>
        <Formik
          initialValues={{
            title: "",
            description: "",
            photo: "",
            video: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, submitForm, values }) => (
            <View className="max-w-xs mt-8">
              <CustomTextInput
                className="min-w-full mt-5"
                mode="outlined"
                label="Title"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                placeholder="Recipe title"
              />
              <CustomTextInput
                className="min-w-full mt-5"
                mode="outlined"
                multiline
                numberOfLines={5}
                scrollEnabled
                label="Description"
                placeholder="Description..."
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />
              <CustomTextInput
                className="min-w-full mt-5"
                mode="outlined"
                label="Add Photo"
                placeholder="Add Photo"
                onChangeText={handleChange("photo")}
                onBlur={handleBlur("photo")}
                value={values.photo}
              />
<Button mode="contained" onPress={pickImage}>Pick a photo</Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              <CustomTextInput
                className="min-w-full mt-5"
                mode="outlined"
                label="Add Video URL"
                placeholder="Add Video URL"
                onChangeText={handleChange("video")}
                onBlur={handleBlur("video")}
                value={values.video}
              />
              <Button
                mode="contained"
                className="mt-5"
                onPress={submitForm}
                loading={isLoading ? true : false}
              >
                Post
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default AddRecipe;
