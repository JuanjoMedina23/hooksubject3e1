import React, { useState } from "react";
import { View, Pressable, TextInput } from "react-native";
import CustomText from "../../components/ui/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import "@/global.css";
import { z } from "zod";

const registerSchema = z //se crea un objeto z, q se va a usar para guardar las varibales que usaremos para registrar a ususario
  .object({//este objeto tiene nombre de usuario, email, que tiene que cumplir con algunos campos por ejemplo q tenga @gamil.com
    name: z.string().min(1, "El nombre es obligatorio."),
    email: z
      .string()
      .email("Correo electrónico inválido.")
      .refine((val) => val.endsWith("@gmail.com"), {
        message: "El correo debe ser una cuenta de Gmail (@gmail.com).",
      }),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),//debe contener al menos 6 caracteres valga la redundancia
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, { // aqui valida si las contraseñas son iguales
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({//aqui solo se usa el email y la contraseña para validar si es correcto o no el login 
  email: z
    .string()
    .email("Correo electrónico inválido.")
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "El correo debe ser una cuenta de Gmail (@gmail.com).",
    }),
  password: z.string().min(1, "La contraseña es obligatoria."),
  
});

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuth = () => {
    if (isRegistering) {
      
      const result = registerSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
      });

      if (!result.success) {
        alert(result.error.errors[0].message);
        return;
      }

     
      router.push("/DashboardScreen");
    } else {
      
      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        alert(result.error.errors[0].message);
        return;
      }

     
      router.push("/DashboardScreen");
    }
    
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-black">
      <View className="w-full max-w-md items-center">
        {/* Logo Spotify */}
        <FontAwesome5 name="spotify" size={64} color="#1DB954" />

        {/* Título */}
        <CustomText variant="titleSPOTY" value="Millones de canciones." />
        <CustomText variant="titleSPOTY" value="Gratis en Spotify." />

        {/* Formulario */}
        <View className="w-full mt-6">
          {isRegistering && (
            <TextInput
              placeholder="Nombre completo"
              placeholderTextColor="#A1A1AA"
              value={name}
              onChangeText={setName}
              className="bg-white/10 text-white border border-gray-500 rounded-full px-4 py-3 mb-4"
            />
          )}

          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#A1A1AA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-white/10 text-white border border-gray-500 rounded-full px-4 py-3 mb-4"
          />

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#A1A1AA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="bg-white/10 text-white border border-gray-500 rounded-full px-4 py-3 mb-4"
          />

          {isRegistering && (
            <TextInput
              placeholder="Confirmar contraseña"
              placeholderTextColor="#A1A1AA"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              className="bg-white/10 text-white border border-gray-500 rounded-full px-4 py-3 mb-4"
            />
          )}

          <Pressable
            onPress={handleAuth}
            className="bg-[#1DB954] p-4 rounded-full mb-3"
          >
            <CustomText
              variant="button"
              value={isRegistering ? "Registrarse" : "Iniciar sesión"}
            />
          </Pressable>

          {/* Alternar entre login y registro */}
          <Pressable onPress={() => setIsRegistering(!isRegistering)}>
            <CustomText
              variant="link"
              value={
                isRegistering
                  ? "¿Ya tienes cuenta? Iniciar sesión"
                  : "¿No tienes cuenta? Registrarse"
              }
            />
          </Pressable>
        </View>

        {/* Divider opcional */}
        <View className="h-px w-full bg-gray-700 my-6" />

        {/* Botón Facebook
        --------------------IMPORTANTE, SOLO ESTE BOTON MANDA AL NOT FOUND PAGE------------------ */}
        <Pressable
          onPress={() => router.push("/+not-found")}
          className="bg-[#3b5998] p-3 rounded-full mb-3 flex-row items-center justify-center"
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            color="white"
            style={{ marginRight: 12 }}
          />
          <CustomText variant="button" value="Iniciar sesión con Facebook" />
        </Pressable>

        {/* Botón Google */}
        <Pressable
          onPress={() => router.push("/DashboardScreen")}
          className="bg-black p-3 rounded-full mb-3 flex-row items-center justify-center border border-green-300"
        >
          <Ionicons
            name="logo-google"
            size={24}
            color="red"
            style={{ marginRight: 12 }}
          />
          <CustomText variant="button" value="Continuar con Google" />
        </Pressable>

        {/* Botón Apple */}
        <Pressable
          onPress={() => router.push("/DashboardScreen")}
          className="bg-black p-3 rounded-full mb-6 flex-row items-center justify-center border border-green-300"
        >
          <Ionicons
            name="logo-apple"
            size={24}
            color="white"
            style={{ marginRight: 12 }}
          />
          <CustomText variant="button" value="Continuar con Apple" />
        </Pressable>

        {/* Link de acceso rápido */}
        <Pressable onPress={() => router.push("/DashboardScreen")}>
          <CustomText variant="link" value="Inicio Rápido" />
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
