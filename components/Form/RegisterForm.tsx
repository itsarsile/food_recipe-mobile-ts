import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  TextInput,
  TextInputProps,
  useTheme,
} from "react-native-paper";
import { Controller, useForm } from "react-hook-form";


export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: ""
    },
  });

  console.log(watch())
  

  return (
    <View className="flex items-center gap-5">
      <View className="items-center">
        <Text className="text-3xl font-medium text-yellow-400">
          Let's Get Started !
        </Text>
        <Text className="text-sm text-slate-400">
          Create new account to access all features
        </Text>
      </View>
      <View className="max-w-xs space-y-10">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, onBlur } }) => (
            <CustomTextInput
              label="Name"
              onChangeText={onChange}
              placeholder="Enter your name"
              icon="account-outline"
              className="min-w-full mb-3"
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, onBlur } }) => (
            <CustomTextInput
              label="E-Mail"
              placeholder="Enter your email"
              icon="email-outline"
              className="min-w-full mb-3"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, onBlur } }) => (
            <CustomTextInput
              label="Phone"
              placeholder="Enter your phone"
              icon="phone-outline"
              className="min-w-full mb-3"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, onBlur } }) => (
            <CustomTextInput
              label="Password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter your password"
              icon="lock-outline"
              className="min-w-full mb-3"
              secureTextEntry={true}
            />
          )}
        />

        <Controller
          name="passwordConfirm"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, onBlur } }) => (
            <CustomTextInput
              label="Password Confirm"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Confirm your password"
              icon="lock-outline"
              className="min-w-full"
              secureTextEntry={true}
            />
          )}
        />
        <Button mode="contained">
          Sign Up
        </Button>
      </View>
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
