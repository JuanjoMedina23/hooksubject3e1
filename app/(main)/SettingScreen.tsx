import { View, Text, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const SettingScreen = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const bgColor = darkMode ? "bg-black" : "bg-gray-100";
  const cardColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";
  const subTextColor = darkMode ? "text-gray-400" : "text-gray-700";

  return (
    <View className={`flex-1 px-6 py-8 ${bgColor}`}>
      {/* Header */}
      <Text className={`text-3xl font-bold mb-8 ${textColor}`}></Text>
      <Text className={`text-3xl font-bold mb-8 ${textColor}`}></Text>
      <Text className={`text-3xl font-bold mb-8 ${textColor}`}></Text>
      <Text className={`text-3xl font-bold mb-8 ${textColor}`}>Ajustes</Text>

      {/* Modo Oscuro */}
      <View className={`flex-row justify-end items-center p-5 mb-4 rounded-2xl ${cardColor} shadow-lg`}>
        <View className="flex-1 pr-4">
          <Text className={`text-base font-semibold ${textColor}`}>Modo Oscuro</Text>
          <Text className={`text-sm ${subTextColor}`}>Activa el tema oscuro de la app</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={() => setDarkMode(!darkMode)}
          thumbColor={darkMode ? "#1DB954" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#1DB954" }}
        />
      </View>

      {/* Notificaciones */}
      <View className={`flex-row justify-end items-center p-5 mb-4 rounded-2xl ${cardColor} shadow-lg`}>
        <View className="flex-1 pr-4">
          <Text className={`text-base font-semibold ${textColor}`}>Notificaciones</Text>
          <Text className={`text-sm ${subTextColor}`}>Recibe avisos sobre música y novedades</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={() => setNotifications(!notifications)}
          thumbColor={notifications ? "#1DB954" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#1DB954" }}
        />
      </View>

      {/* Cuenta */}
      <View className="flex-row justify-end mb-4">
        <TouchableOpacity className={`p-5 rounded-2xl ${cardColor} shadow-lg w-2/3`}>
          <Text className={`text-base font-semibold ${textColor}`}>Cuenta</Text>
          <Text className={`text-sm ${subTextColor}`}>Gestiona tu perfil y datos</Text>
        </TouchableOpacity>
      </View>

      {/* Privacidad */}
      <View className="flex-row justify-end">
        <TouchableOpacity className={`p-5 rounded-2xl ${cardColor} shadow-lg w-2/3`}>
          <Text className={`text-base font-semibold ${textColor}`}>Privacidad</Text>
          <Text className={`text-sm ${subTextColor}`}>Ajusta tu privacidad y permisos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;
