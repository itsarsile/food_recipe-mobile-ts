import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
export default function PopularForYou() {
  return (
    <View className="p-5">
      <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
        Popular For You
      </Text>
      <View style={styles.container}>
        <View className="space-y-1">
          <Image source={require("@/assets/images/kettle.png")} />
          <Text className="text-center">Soup</Text>
        </View>
        <View className="space-y-1">
          <Image source={require("@/assets/images/fork.png")} />
          <Text className="text-center">Chicken</Text>
        </View>
        <View className="space-y-1">
          <Image source={require("@/assets/images/seafood.png")} />
          <Text className="text-center">Seafood</Text>
        </View>
        <View className="space-y-1">
          <Image source={require("@/assets/images/fork.png")} />
          <Text className="text-center">Desert</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 30,
        marginTop: 20
    }
});
