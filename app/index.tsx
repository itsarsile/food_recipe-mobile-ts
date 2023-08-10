import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card, Modal, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "@/components/Form/RegisterForm";

export default function LoginPage() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  
  return (
    <SafeAreaView>
      <View className="flex justify-center items-center min-h-full">
        <RegisterForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
});
