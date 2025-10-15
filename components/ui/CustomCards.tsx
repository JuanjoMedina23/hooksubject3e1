import { View, Text, Image } from "react-native";
import React from "react";

type Props = { title: string; imageUrl: string };

const CustomCard = ({ title, imageUrl }: Props) => {
  return (
    <View className="mr-4 w-40 h-40 bg-gray-800 rounded-xl overflow-hidden">
      <Image source={{ uri: imageUrl }} className="w-full h-full" />
      <View className="absolute bottom-2 left-2">
        <Text className="text-white font-bold">{title}</Text>
      </View>
    </View>
  );
};

export default CustomCard;
