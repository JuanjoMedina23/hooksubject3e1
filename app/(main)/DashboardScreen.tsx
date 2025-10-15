import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../components/ui/CustomText";

// Tipos
type Playlist = {
  id: number;
  title: string;
  image: string;
};

type Song = {
  id: number;
  title: string;
  artist: string;
  image: string | null;
};

// Playlists destacadas
const playlists: Playlist[] = [
  { id: 1, title: "Top Hits", image: "https://picsum.photos/200/200?random=1" },
  { id: 2, title: "Rock Classics", image: "https://picsum.photos/200/200?random=2" },
  { id: 3, title: "Pop Party", image: "https://picsum.photos/200/200?random=3" },
  { id: 4, title: "Relax", image: "https://picsum.photos/200/200?random=4" },
];

// Canciones populares
const songs: Song[] = [
  { 
    id: 1, 
    title: "Spiderhead", 
    artist: "Cage The Elephant",
    image: "https://i.scdn.co/image/ab67616d0000b2739166a9093ea242eed64d21c6",
  },
  { 
    id: 2, 
    title: "Vida", 
    artist: "Canserbero",
    image: "https://i.scdn.co/image/ab67616d0000b2730f38ea3b0b59d4b59b4da2e6",
  },
  { 
    id: 3, 
    title: "Contigo", 
    artist: "Elefante",
    image: "https://i.ytimg.com/vi/Mrpo8ninMGs/maxresdefault.jpg",
  },
  { 
    id: 4, 
    title: "Undercromo", 
    artist: "W Sound",
    image: "https://billboard.com.co/wp-content/uploads/2025/07/w-sound-6-770x470.png",
  },
  { 
    id: 5, 
    title: "Canción 5", 
    artist: "Artista 5",
    image: null,
  },
];

const DashboardScreen = () => {
  // Canción que se está reproduciendo (la primera como ejemplo)
  const nowPlaying = songs[0];

  return (
    <View className="flex-1 bg-black">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="px-4 py-6"
        contentContainerStyle={{ paddingBottom: 80 }} // Espacio para el mini player
      >
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <CustomText variant="titleSPOTY" value="" />
        </View>
        
        <View className="flex-row justify-between items-center mb-6">
          <CustomText variant="titleSPOTY" value="Hola, JUANJO" />
          <Text className="text-white text-xl">🎧</Text>
        </View>
        
        {/* Playlists destacadas */}
        <CustomText variant="titleSPOTY" value="Destacadas" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="my-4"
        >
          {playlists.map((pl) => (
            <TouchableOpacity
              key={pl.id}
              className="mr-4 w-40 h-40 bg-gray-900 rounded-xl overflow-hidden"
            >
              <Image
                source={pl.image}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                }}
                contentFit="cover"
                transition={300}
              />
              <View className="absolute bottom-2 left-2">
                <Text className="text-white font-bold">{pl.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Canciones populares */}
        <CustomText variant="title" value="Populares" />
        <View className="mt-4">
          {songs.map((song) => (
            <TouchableOpacity
              key={song.id}
              className="flex-row items-center mb-4"
            >
              {/* Imagen pequeña o placeholder */}
              {song.image ? (
                <Image
                  source={song.image}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    marginRight: 16,
                  }}
                  contentFit="cover"
                  transition={300}
                />
              ) : (
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    marginRight: 16,
                    backgroundColor: "#374151",
                  }}
                />
              )}

              {/* Título y artista */}
              <View style={{ flex: 1 }}>
                <Text className="text-white font-semibold">{song.title}</Text>
                <Text className="text-gray-400 text-sm">{song.artist}</Text>
              </View>

              {/* Botón reproducir */}
              <Ionicons name="play-circle" size={28} color="#1DB954" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Mini Player fijo en la parte inferior */}
      <View 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#282828',
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#404040',
        }}
      >
        <TouchableOpacity className="flex-row items-center justify-between">
          {/* Imagen del álbum */}
          <View className="flex-row items-center flex-1">
            {nowPlaying.image ? (
              <Image
                source={nowPlaying.image}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 4,
                  marginRight: 12,
                }}
                contentFit="cover"
              />
            ) : (
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 4,
                  marginRight: 12,
                  backgroundColor: "#374151",
                }}
              />
            )}

            {/* Info de la canción */}
            <View className="flex-1">
              <Text className="text-white font-semibold text-sm" numberOfLines={1}>
                {nowPlaying.title}
              </Text>
              <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>
                {nowPlaying.artist}
              </Text>
            </View>
          </View>

          {/* Controles */}
          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="pause" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Barra de progreso */}
        <View 
          style={{
            height: 2,
            backgroundColor: '#404040',
            marginTop: 8,
            borderRadius: 1,
          }}
        >
          <View 
            style={{
              height: '100%',
              width: '69%', // Simula 35% de reproducción
              backgroundColor: '#1DB954',
              borderRadius: 1,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen; 