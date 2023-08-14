import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useAuth } from "@/components/context/AuthContext";

export default function _layout() {
  //@ts-ignore
  const { user } = useAuth();
  console.log(user);
  const theme = useTheme();
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={25} color={color} />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}
      />
      <Tabs.Screen
        name="addrecipe"
        options={{
          headerShown: false,
          tabBarLabel: "Add Recipe",
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-square" size={24} color={color} />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubble-outline" size={24} color={color} />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          headerShown: false,
          tabBarLabel: "User",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
