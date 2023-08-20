import { useGetRecipesByIdQuery } from "@/src/features/recipes/recipesApiSlice";
import { Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Title, useTheme } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();
export default function RecipeDetail() {
  const theme = useTheme();
  const { recipeId } = useLocalSearchParams();
  const { data, isLoading } = useGetRecipesByIdQuery(Number(recipeId));
  if (isLoading)
    console.log(
      "🚀 ~ file: [recipeId].tsx:9 ~ RecipeDetail ~ isLoading:",
      isLoading
    );

  const recipe = data?.recipe[0];
  const blurHash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <ScrollView className="min-h-screen">
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
      <View className="w-full min-h-screen">
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
          <Tab.Screen name="Video Step" component={VideoStep} />
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

const VideoStep = () => {
  return (
    <View className="bg-white h-full">
      <Text>VideoStep</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },
});
