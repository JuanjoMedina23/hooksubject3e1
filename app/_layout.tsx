import { Stack } from 'expo-router';
import React from 'react';
import "@/global.css";
export default function _layout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      
    }}>
      <Stack.Screen name="index" options={{
          title: "", 
        }} 
      /><Stack.Screen name="(main)" options={{
          headerShown: false, 
        }} 
      />
    </Stack>
  );
}
