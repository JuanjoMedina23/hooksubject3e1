import { Tabs } from "expo-router";
import React from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import "@/global.css";


const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor: "black", borderTopWidth: 0 },
      headerShown: false,
    }}>
      <Tabs.Screen 
        name="DashboardScreen" 
        options={{ 
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="music" color={'green'} size={size} />
          )
        }} 
      />

      {/* Settings */}
      <Tabs.Screen 
        name="SettingScreen" 
        options={{ 
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="cog" color={'green'} size={size} />
          )
        }} 
      />
    </Tabs>
  );
};

export default TabsLayout;
