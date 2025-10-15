import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // si usas expo-router


const NotFound = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black justify-center items-center px-6">
      <Text className="text-5xl font-bold text-white mb-4">ERROR 404</Text>
      <Text className="text-xl text-gray-400 text-center mb-8">
        No se encontró la página que buscabas.
      
      </Text>

      <TouchableOpacity
        className="bg-green-500 px-6 py-3 rounded-full shadow-lg"
        onPress={() => router.push('/')} 
      >
        <Text className="text-white font-bold text-lg">
          Volver al inicio
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFound;
