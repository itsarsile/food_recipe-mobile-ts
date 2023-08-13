import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, useTheme } from "react-native-paper";
import { CustomTextInput } from "@/components/Themed";
import { Link } from "expo-router";
import { useAuth } from "@/components/context/AuthContext";
import { Formik } from "formik";

export default function LoginPage() {
  const { signIn } = useAuth();
  const theme = useTheme();

  const handleSubmit = async (values) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="items-center justify-center min-h-screen">
      <Avatar.Image
        source={require("@/assets/images/avatar_default.png")}
        size={180}
      />
      <Text
        style={{
          color: theme.colors.primary,
          fontWeight: "500",
          fontSize: 18,
          marginTop: 20,
        }}
      >
        Welcome!
      </Text>
      <Text
        style={{
          color: theme.colors.secondary,
        }}
      >
        Log in to your existing account
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, submitForm, values }) => (
          <View className="max-w-xs mt-10">
            <CustomTextInput
              label="Email"
              mode="outlined"
              icon="account"
              placeholder="Masukkan email"
              className="min-w-full mb-3"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <CustomTextInput
              label="Password"
              mode="outlined"
              icon="lock"
              secureTextEntry
              placeholder="Masukkan password"
              className="min-w-full mb-5"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Text
              className="mb-3 text-right"
              style={{ color: theme.colors.secondary }}
            >
              Forgot Password?
            </Text>
            <Button mode="contained" onPress={submitForm}>
              LOG IN
            </Button>
            <View>
              <Text style={{ color: theme.colors.secondary, marginTop: 10 }}>
                Don't have account?{" "}
                <Link style={{ color: theme.colors.primary }} href="/register">
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({});
