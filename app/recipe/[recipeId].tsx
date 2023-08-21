import { useGetRecipesByIdQuery } from "@/src/features/recipes/recipesApiSlice";
import { Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Pressable } from "react-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, useTheme } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import {
  useCreateCommentMutation,
  useGetCommentQuery,
} from "@/src/features/comments/commentsApiSlice";
import { CustomTextInput } from "@/components/Themed";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/features/auth/authSlice";

const Tab = createMaterialTopTabNavigator();
export default function RecipeDetail() {
  const theme = useTheme();
  const user = useSelector(selectCurrentUser);
  console.log("🚀 ~ file: [recipeId].tsx:24 ~ user:", user);
  const { recipeId } = useLocalSearchParams();
  const { data, isLoading } = useGetRecipesByIdQuery(Number(recipeId));
  console.log("🚀 ~ file: [recipeId].tsx:23 ~ data:", data);
  const { data: comments, isLoading: loadingComments } = useGetCommentQuery(
    Number(recipeId)
  );
  if (loadingComments) console.log("Loading comments...");
  if (isLoading)
    console.log(
      "🚀 ~ file: [recipeId].tsx:9 ~ RecipeDetail ~ isLoading:",
      isLoading
    );

  const recipe = data?.recipe[0];
  const commentsData = comments?.comments;
  console.log(recipe?.video);
  const blurHash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  // @ts-ignore
  return (
    <ScrollView className="">
      <View className="w-full h-1/2 items-center justify-center relative">
        <Pressable className="absolute z-10 top-10 left-3 shadow-lg">
          <Link href="../">
            <Feather name="chevron-left" size={36} color="white" />
          </Link>
        </Pressable>
        <Title className="absolute z-10 text-white text-4xl font-bold left-5 bottom-5">
          {recipe?.title}
        </Title>
        <Image
          source={recipe?.photo}
          style={styles.image}
          contentFit="cover"
          placeholder={blurHash}
          transition={1000}
        />
      </View>
      <View className="h-screen">
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              width: "100%",
              backgroundColor: "#ffff",
              elevation: 0,
            },
            tabBarIndicatorStyle: {
              height: 5,
              borderRadius: 10,
              backgroundColor: theme.colors.primary,
            },
            swipeEnabled: false,
          }}
        >
          <Tab.Screen name="Ingredients">
            {(props) => (
              <Ingredients {...props} ingredients={recipe?.description} />
            )}
          </Tab.Screen>
          <Tab.Screen name="VideoStep" options={{ title: "Video" }}>
            {(props) => (
              <VideoStep
                {...props}
                url={recipe?.video}
                comments={commentsData}
                recipeId={Number(recipeId)}
                authorId={Number(user?.id)}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
}

const Ingredients = ({ ingredients }: { ingredients: string | undefined }) => {
  return (
    <View className="bg-white">
      <View className="p-5">
        <Card
          style={{
            backgroundColor: "#FAF7ED",
          }}
        >
          <ScrollView className="h-[330px]">
            <Card.Content>
              <Text>{ingredients}</Text>
            </Card.Content>
          </ScrollView>
        </Card>
      </View>
    </View>
  );
};

const VideoStep = ({
  url,
  comments,
  recipeId,
  authorId,
}: {
  authorId: number;
  url: string | undefined;
  comments: any;
  recipeId: number;
}) => {
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const { refetch } = useGetCommentQuery(recipeId);
  const handleSubmit = async (values: any) => {
    try {
      const response = await createComment(values);
      refetch();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenVideo = async () => {
    if (typeof url === "string") {
      await WebBrowser.openBrowserAsync(url);
    }
  };
  return (
    <View className="bg-white" style={styles.commentsContainer}>
      {url && (
        <Button onPress={handleOpenVideo} mode="contained" className="p-5">
          Open Video
        </Button>
      )}
      <ScrollView>
        <View style={{ height: 2000 }}>
          <Text className="font-medium text-slate-400 my-5">Comment :</Text>
          {comments &&
            comments.map((comment: any) => (
              <View
              key={comment.id}
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  columnGap: 20,
                }}
              >
                <Avatar.Image
                  source={require("../../assets/images/avatar_default.png")}
                />
                <View>
                  <Text className="font-bold text-lg">{comment?.author}</Text>
                  <Text style={{ maxWidth: 280 }}>{comment?.text}</Text>
                  <Text
                    className="text-slate-400 italic"
                    style={{ fontSize: 12 }}
                  >
                    {new Date(comment?.createdAt).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          <Formik
            initialValues={{
              recipeId: recipeId,
              authorId: authorId,
              text: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, submitForm, values }) => (
              <>
                <CustomTextInput
                  label={"Comments"}
                  placeholder={"Tambahkan komentar..."}
                  multiline
                  numberOfLines={10}
                  onBlur={handleBlur("text")}
                  onChangeText={handleChange("text")}
                  mode={"outlined"}
                  value={values.text}
                />
                <Button
                  mode={"contained"}
                  onPress={submitForm}
                  loading={isLoading ? true : false}
                >
                  Post a comment
                </Button>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },

  commentsContainer: {
    padding: 10,
  },
});
