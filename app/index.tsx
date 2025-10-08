import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';

const index = () => {
  return (
    <View>
      <TouchableOpacity 
        onPress={() => {router.push("../DashboardScreen")}} // Aquí puedes agregar alguna lógica si lo necesitas
        activeOpacity={0.7} // Hace que el botón tenga un efecto de opacidad cuando se presiona
        style={{
          backgroundColor: '#3498db', // Color de fondo del botón
          paddingVertical: 10, // Espacio en la parte superior e inferior del botón
          paddingHorizontal: 20, // Espacio en los lados del botón
          borderRadius: 5, // Bordes redondeados
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
          <Text style={{ color: 'white', fontSize: 16 }}>Go to DashboardScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
