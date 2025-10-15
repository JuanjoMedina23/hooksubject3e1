import { View, Text } from 'react-native'
import React from 'react'
import "@/global.css";
import Login from "../components/auth/Login";
const index = () => {
  return (
    <View className='flex-1 bg-black justify-center items-center px-4'>
      <Login />
    </View>
  )
}

export default index