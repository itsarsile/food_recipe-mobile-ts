import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useGetRecipesByIdQuery } from "@/src/features/recipes/recipesApiSlice";
import { ScrollView } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Card, useTheme } from "react-native-paper";

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
  console.log("🚀 ~ file: [recipeId].tsx:17 ~ RecipeDetail ~ recipe:", recipe);
  const blurHash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <ScrollView className="min-h-screen">
      <View className="w-full h-1/2 items-center justify-center">
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
    <View className="bg-white h-full">
      <View className="p-5">
        <Card
          style={{
            backgroundColor: "#FAF7ED",
          }}
        >
          <Card.Content>
            <Text>{ingredients}</Text>
          </Card.Content>
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
