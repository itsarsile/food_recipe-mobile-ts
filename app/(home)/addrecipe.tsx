import { CustomTextInput } from "@/components/Themed";
import { selectCurrentUser } from "@/src/features/auth/authSlice";
import {
  useCreateMutation,
  useGetRecipesQuery,
} from "@/src/features/recipes/recipesApiSlice";
import { Formik } from "formik";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

const AddRecipe = () => {
  const [create, { isLoading }] = useCreateMutation();
  // @ts-ignore
  const user = useSelector(selectCurrentUser);
  console.log("🚀 ~ file: addrecipe.tsx:17 ~ AddRecipe ~ user:", user);
  const theme = useTheme();
  const handleSubmit = async (values: any) => {
    try {
      const response = await create(values);
      console.log(
        "🚀 ~ file: addrecipe.tsx:29 ~ handleSubmit ~ response:",
        response
      );
    } catch (error) {
      console.error(error);
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
