import { TextInput, TextInputProps, useTheme } from "react-native-paper";
import React, { useState } from "react";

interface CustomTextInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  icon?: string;
  className?: string;
  secureTextEntry?: boolean;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
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
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
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

