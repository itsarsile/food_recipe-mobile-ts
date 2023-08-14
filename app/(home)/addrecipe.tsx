import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, useTheme } from "react-native-paper";
import { CustomTextInput } from "@/components/Themed";
import { Formik } from "formik";
import * as SecureStorage from "expo-secure-store";
import { useAuth } from "@/components/context/AuthContext";
import axios from "axios";
import { useRouter } from "expo-router";

const AddRecipe = () => {
  const router = useRouter();
  const { user } = useAuth();
  const theme = useTheme();
  const handleSubmit = async (values: any) => {
    try {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/recipes`, values)
        .then((res) => {
          alert(res.status);
          router.push("/home");
        })
        .catch((err) => alert(err));
    } catch (error) {}
  };
  return (
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
          userId: user.user.id,
          title: "",
          description: "",
          photo: "",
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
            <Button mode="contained" className="mt-5" onPress={submitForm}>
              Post
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddRecipe;
