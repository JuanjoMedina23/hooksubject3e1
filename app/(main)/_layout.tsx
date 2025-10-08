import { Stack } from 'expo-router';
import React from 'react';

const MainLayout = () => {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: 'blue' } }}>
      <Stack.Screen
        name="DashboardScreen"
        options={{
          title: "mierda de perro"
        }}
      />
    </Stack>
  );
};

export default MainLayout
