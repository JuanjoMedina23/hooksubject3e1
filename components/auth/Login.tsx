import React from "react";
import { View, Pressable} from "react-native";
import CustomText from "../../components/ui/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import "@/global.css";

const Login: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center px-6 bg-black">
      <View className="w-full max-w-md items-center">
        {/* Logo Spotify */}
        
        <FontAwesome5 name="spotify" size={64} color="#1DB954" />
        

        {/* Título */}
        <CustomText variant="titleSPOTY" value="Millones de canciones." />
        <CustomText variant="titleSPOTY" value="Gratis en Spotify." />

        {/* Botón Registrarse */}
        <Pressable
          onPress={() => router.push("/DashboardScreen")}
          className="w-full bg-[#1DB954] p-4 rounded-full mb-3 mt-8"
        >
          <CustomText variant="button" value="Registrarte gratis" />
        </Pressable>

        {/* Botón Facebook */}
        <Pressable
          onPress={() => router.push("/DashboardScreen")}
          className=" bg-[#3b5998] p-3 rounded-full mb-3 flex-row items-center justify-center"
        >
          <Ionicons name="logo-facebook" size={24} color="white" style={{ marginRight: 12 }} />
          <CustomText variant="button" value="Iniciar sesión con Facebook" />
        </Pressable>

        {/* Botón Google */}
        <Pressable
          onPress={() => router.push("/DashboardScreen")}
          className=" bg-black p-3 rounded-full mb-3 flex-row items-center justify-center border border-green-300"
        >
          <Ionicons name="logo-google" size={24} color="red" style={{ marginRight: 12 }} />
          <CustomText variant="button" value="Continuar con Google" />
        </Pressable>

        {/* Botón Apple */}
        <Pressable
          onPress={() => router.push("/DashboardScreen")}
          className=" bg-black p-3 rounded-full mb-6 flex-row items-center justify-center border border-green-300"
        >
          <Ionicons name="logo-apple" size={24} color="white" style={{ marginRight: 12 }} />
          <CustomText variant="button" value="Continuar con Apple" />
        </Pressable>

        {/* Link Iniciar sesión */}
        <Pressable onPress={() => router.push("/DashboardScreen")}>
          <CustomText variant="link" value="Iniciar sesión" />
        </Pressable>
      </View>
    </View>
  );
};

export default Login;