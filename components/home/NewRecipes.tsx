import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import CarouselCard from "@/components/Carousel/CarouselCard";

export default function NewRecipes() {
  return (
    <View className="p-5 -mt-3">
      <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
        New Recipes
      </Text>
      <CarouselCard />
    </View>
  );
}
