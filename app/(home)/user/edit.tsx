import { View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Divider, List } from "react-native-paper";
export default function Modal() {
  const isPresented = router.canGoBack(); 
  return (
    <View>
      {!isPresented && <Link href="../">Dismiss</Link>}
      <List.Item title="Change profile picture" />
      <Divider />
      <List.Item title="Change password" />
      <Divider />

      <StatusBar style="dark" />
    </View>
  );
}
