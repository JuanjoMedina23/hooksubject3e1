import React from "react";
import { View, TextInput, Pressable } from "react-native";
import CustomText from "../ui/CustomText";

export default function Login() {
  return (
    <View className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg mx-4">
      {/* Título */}
      <CustomText variant="title" value="Inicar Sesión" />
      {/* Inputs */}
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="777"
        className="w-full bg-gray-100 p-4 rounded-2xl mb-4 border border-gray-300 shadow-sm"
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#777"
        secureTextEntry
        className="w-full bg-gray-100 p-4 rounded-2xl mb-6 border border-gray-300 shadow-sm"
      />

      {/* Botón */}
      <Pressable className="w-full bg-purple-300 p-4 rounded-2xl mb-4">
        <CustomText variant="button" value="Entrar" />
      </Pressable>

      {/* Link de registro */}
      <Pressable>
        <CustomText variant="link" value="¿No tienes cuenta? Regístrate" />
      </Pressable>
    </View>
  );
}
