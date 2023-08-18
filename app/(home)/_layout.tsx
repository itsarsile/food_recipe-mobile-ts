import { selectCurrentUser } from "@/src/features/auth/authSlice";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Link, Tabs, router, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

export default function _layout() {
  //@ts-ignore
  const theme = useTheme();
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
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
      <Tabs.Screen
        name="recipe/[recipeId]"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerLeft: (props) => {
            return (
              <TouchableOpacity>
                <Link href="../">
                  <Feather name="chevron-left" size={28} color="white" />
                </Link>
              </TouchableOpacity>
            );
          },
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
