import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';

const Index = () => {
  const [handle, setHandle] = useState<boolean>(true);

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity 
        onPress={() => router.push("../DashboardScreen")}
        activeOpacity={0.7}
        style={{
          backgroundColor: '#3498db',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Go to DashboardScreen</Text>
      </TouchableOpacity>

      {handle ? (
        <TouchableOpacity onPress={() => setHandle(false)}>
          <Text>DESPEDIRSE</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setHandle(true)}>
          <Text>HOLA</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Index;
