import React from "react";
import { Text } from "react-native";

interface CustomTextProps {
  variant?: "normal" | "subtitle" | "title" | "button" | "link"|"titleSPOTY";
  value: string; 
}

const CustomText = ({value,variant="normal"}:CustomTextProps) => {
  return (
    <Text className={selectVariant(variant)}>
        {value}
    </Text>
  );
};

export default CustomText;

function selectVariant(variant: string): string {
  switch (variant) {
    case "normal":
      return "text-black font-normal";
    case "subtitle":
      return "text-gray-400 font-normal text-xl";
    case "title":
      return "text-black font-bold text-2xl text-center";
    case "button":
      return "text-white font-bold text-center";
    case "link":
      return "text-blue-600 underline text-center";
      case "titleSPOTY":
      return "text-white font-bold text-2xl";
    default:
      return "text-black font-normal";
  }
}
