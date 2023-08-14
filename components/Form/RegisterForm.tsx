import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import { Formik } from "formik";
import {
  Button,
  TextInput,
  TextInputProps,
  useTheme,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = (values: Object) => {
    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`, values)
      .then((res) => {
        console.log(res.data);
        alert(res.data[0]);
        router.push("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View className="flex items-center gap-5">
      <View className="items-center">
        <Text className="text-3xl font-medium text-yellow-400">
          Let's Get Started !
        </Text>
        <Text
          className="text-sm text-slate-400"
          style={{ fontFamily: "AirBnB" }}
        >
          Create new account to access all features
        </Text>
      </View>
      <Formik
        initialValues={{ name: "", email: "", phone: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, submitForm, values }) => (
          <View className="max-w-xs ml-5 space-y-3 mt-5">
            <CustomTextInput
              label="Name"
              placeholder="Enter your name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              icon="account-outline"
              className="min-w-full"
            />
            <CustomTextInput
              label="E-Mail"
              placeholder="Enter your email"
              icon="email-outline"
              className="min-w-full"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <CustomTextInput
              label="Phone"
              placeholder="Enter your phone"
              icon="phone-outline"
              className="min-w-full"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              icon="lock-outline"
              className="min-w-full"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button mode="contained" onPress={submitForm}>
              Sign Up
            </Button>
          </View>
        )}
      </Formik>
      <Text>Already have account?</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

interface CustomTextInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  icon?: string;
  className?: string;
  secureTextEntry?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  icon,
  className,
  secureTextEntry,
  ...restProps
}) => {
  const theme = useTheme();
  const [isFocused, setFocused] = useState(false);

  return (
    <TextInput
      label={label}
      mode="outlined"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ marginBottom: 10 }}
      outlineColor="#FFFF"
      textColor={theme.colors.primary}
      theme={{
        colors: {
          onSurfaceVariant: isFocused
            ? theme.colors.primary
            : theme.colors.secondary,
        },
      }}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.secondary}
      left={
        icon ? (
          <TextInput.Icon
            icon={icon}
            color={isFocused ? theme.colors.primary : theme.colors.secondary}
          />
        ) : null
      }
      {...restProps}
    />
  );
};
