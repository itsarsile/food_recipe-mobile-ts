import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

interface Recipe {
  id: number;
  title: string;
  photo: string;
  description: string;
  // authorId: number;
}
export default function CarouselCard({ withDescription }: any) {
  return (
    <View>
      <ScrollView horizontal>
        {recipeData.map((recipe) => (
          <Card
            key={recipe.id}
            item={recipe}
            withDescription={withDescription}
          />
        ))}
      </ScrollView>
    </View>
  );
}

interface CardProps {
  item: Recipe;
  withDescription: boolean;
}
const Card = ({ item, withDescription }: CardProps) => {
  return (
    <View className="relative mr-5 py-3">
      <Image style={styles.image} source={{ uri: item.photo }} />
      {withDescription ? (
        <View className="absolute bottom-0 p-5 bg-white h-1/2  w-full">
          <Text className="text-black font-bold text-xl">{item.title}</Text>
          {withDescription && <Text>{item.description}</Text>}
        </View>
      ) : (
        <View className="absolute bottom-0 p-5">
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

const recipeData = [
  {
    id: 1,
    title: "Nasi Goreng Pete",
    description: "Nasi Goreng Enak",
    photo:
      "https://th.bing.com/th/id/OIP.nvkWnkA4hufuyndkO3GQVAHaE7?pid=ImgDet&rs=1",
  },
  {
    id: 2,
    title: "Nasi Goreng Pete",
    description: "Nasi Goreng Enak",
    photo:
      "https://th.bing.com/th/id/OIP.nvkWnkA4hufuyndkO3GQVAHaE7?pid=ImgDet&rs=1",
  },
  {
    id: 3,
    title: "Nasi Goreng Pete",
    description: "Nasi Goreng Enak",
    photo:
      "https://th.bing.com/th/id/OIP.nvkWnkA4hufuyndkO3GQVAHaE7?pid=ImgDet&rs=1",
  },
];
