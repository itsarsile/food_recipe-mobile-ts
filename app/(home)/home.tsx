import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomTextInput } from "@/components/Themed";
import PopularRecipes from "@/components/home/PopularRecipes";
import PopularForYou from "@/components/home/PopularForYou";
import NewRecipes from "@/components/home/NewRecipes";
import { Text } from "react-native-paper";

export default function Home() {
  return (
    <SafeAreaView>
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
        <PopularForYou />

        <View>
          <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
            New Recipes
          </Text>

          <NewRecipes />
        </View>
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
            Popular Recipes
          </Text>

          <PopularRecipes />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 5,
  },
});
