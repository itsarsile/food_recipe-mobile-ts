import { CustomTextInput } from "@/components/Themed";
import { useAuth } from "@/components/context/AuthContext";
import NewRecipes from "@/components/home/NewRecipes";
import PopularForYou from "@/components/home/PopularForYou";
import PopularRecipes from "@/components/home/PopularRecipes";
import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };
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
            <PopularForYou />
            <NewRecipes />
            <PopularRecipes />
          </View>

          <Button onPress={handleLogout} mode="contained">
            Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 5,
  },
});
