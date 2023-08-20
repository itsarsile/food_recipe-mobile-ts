import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: (props) => <Feather name="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="addrecipe"
        options={{
          title: "Add Recipe",
          tabBarIcon: (props) => <Feather name="plus-circle" size={24} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: (props) => <Feather name="message-square" size={24} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: (props) => <Feather name="user" size={24} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
