import { Stack } from 'expo-router';
import React from 'react';

export default function _layout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: "red",
      },
    }}>
      <Stack.Screen name="index" options={{
          title: "tu puta madre", 
        }} 
      /><Stack.Screen name="(main)" options={{
          headerShown: false, 
        }} 
      />
    </Stack>
  );
}
