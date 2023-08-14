import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import CarouselCard from "../Carousel/CarouselCard";

export default function PopularRecipes() {
  return (
    <View className="p-5 -mt-3">
      <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
        Popular Recipes
      </Text>
      <CarouselCard withDescription={true} />
    </View>
  );
}
