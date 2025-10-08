import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface CustomInputProps extends TextInputProps {
  placeholder: string;
}

const CustomInput = ({ placeholder, ...props }: CustomInputProps) => {
  return (
    <TextInput
      className="w-full bg-gray-100 p-4 rounded-xl mb-4 border border-gray-300"
      placeholder={placeholder}
      placeholderTextColor="#555"
      {...props}
    />
  );
};

export default CustomInput;
