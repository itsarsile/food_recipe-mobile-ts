import { CustomTextInput } from "@/components/Themed";
import { useAuth } from "@/components/context/AuthContext";
import PopularForYou from "@/components/home/PopularForYou";
import { useGetRecipesQuery } from "@/src/features/recipes/recipesApiSlice";
import { Link, Stack } from "expo-router";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  //@ts-ignore
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View className="w-11/12 mx-auto">
            <CustomTextInput
              label="Search"
              mode="outlined"
              placeholder="Search"
              icon="magnify"
              className="min-w-full"
            />
          </View>
          <View>
            <View className="p-5 -mt-3">
              <Text
                variant="headlineSmall"
                style={{ fontWeight: "bold", marginBottom: 20 }}
              >
                New Recipes
              </Text>
              <CarouselCard />
            </View>

            <PopularForYou />
            <View className="p-5 -mt-3">
              <Text
                variant="headlineSmall"
                style={{ fontWeight: "bold", marginBottom: 20 }}
              >
                Popular Recipes
              </Text>
              <CarouselCard withDescription={true} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface Recipe {
  id: number;
  title: string;
  photo: string;
  description: string;
  // authorId: number;
}

function CarouselCard({ withDescription }: any) {
  const { data, isLoading, refetch } = useGetRecipesQuery();

  if (isLoading)
    return (
      <ContentLoader
        speed={2}
        width={260}
        height={160}
        viewBox="0 0 260 160"
        backgroundColor="#f0f0f0"
        foregroundColor="#ffffff"
      >
        <Rect x="0" y="0" rx="12" ry="12" width="260" height="160" />
        <Rect x="97" y="113" rx="3" ry="3" width="197" height="6" />
        <Rect x="97" y="129" rx="3" ry="3" width="182" height="6" />
        <Rect x="97" y="145" rx="3" ry="3" width="85" height="6" />
      </ContentLoader>
    );

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.recipes.map((recipe) => (
          <Card
            key={recipe.id}
            item={recipe}
            withDescription={withDescription}
            recipeId={recipe.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const Card = ({ item, withDescription, recipeId }: any) => {
  const theme = useTheme();
  return (
    <Link
      href={{
        pathname: "/recipe/[recipeId]",
        params: { recipeId: recipeId },
      }}
      className="mr-5"
    >
      <View className="relative">
        <Image style={styles.image} source={{ uri: item.photo }} />
        {withDescription ? (
          <View className="absolute bottom-0 p-5 bg-white w-[260px] overflow-hidden">
            <Text className="text-black font-bold text-xl">
              {item.title.slice(0, 20)}...
            </Text>
            {withDescription && (
              <Text>
                {item.description.slice(0, 30)}{" "}
                <Text
                  className="italic font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  See more...
                </Text>
              </Text>
            )}
          </View>
        ) : (
          <View className="absolute bottom-0 p-5">
            <Text style={styles.title}>{item.title.slice(0, 20)}...</Text>
          </View>
        )}
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 5,
  },
  image: {
    width: 260,
    height: 160,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
});
