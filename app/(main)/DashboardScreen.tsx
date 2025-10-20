import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomText from "../../components/ui/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";

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
  audio?: any;
};

// Datos
const playlists: Playlist[] = [
  { id: 1, title: "Top Hits", image: "https://picsum.photos/200/200?random=1" },
  { id: 2, title: "Rock Classics", image: "https://picsum.photos/200/200?random=2" },
  { id: 3, title: "Pop Party", image: "https://picsum.photos/200/200?random=3" },
  { id: 4, title: "Relax", image: "https://picsum.photos/200/200?random=4" },
];

const songs: Song[] = [
  { id: 1, title: "Spiderhead", artist: "Cage The Elephant", image: "https://i.scdn.co/image/ab67616d0000b2739166a9093ea242eed64d21c6", audio: require("../../assets/images/musica/Spiderhead.mp3") },
  { id: 2, title: "Vida", artist: "Canserbero", image: "https://i.scdn.co/image/ab67616d0000b2730f38ea3b0b59d4b59b4da2e6", audio: require("../../assets/images/musica/vida.mp3") },
  { id: 3, title: "Contigo", artist: "Elefante", image: "https://i.ytimg.com/vi/Mrpo8ninMGs/maxresdefault.jpg", audio: require("../../assets/images/musica/contigo.mp3") },
  { id: 4, title: "Undercromo", artist: "W Sound", image: "https://billboard.com.co/wp-content/uploads/2025/07/w-sound-6-770x470.png", audio: require("../../assets/images/musica/under.mp3") },
  { id: 5, title: "Sparks", artist: "Coldplay", image: "https://i.scdn.co/image/ab67616d00001e029164bafe9aaa168d93f4816a", audio: require("../../assets/images/musica/sparks.mp3") },
];

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const DashboardScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0 = off, 1 = repeat all, 2 = repeat one
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const translateY = useRef(new Animated.Value(screenHeight - 80)).current;
  const soundRef = useRef<Audio.Sound | null>(null);
  const soundRefs = useRef<{ [key: number]: Audio.Sound }>({}); // precarga

  // --- Precarga de audios ---
  useEffect(() => {
    const preloadSounds = async () => {
      for (const song of songs) {
        try {
          const { sound, status } = await Audio.Sound.createAsync(song.audio, {
            shouldPlay: false,
          });
          if (status.isLoaded) soundRefs.current[song.id] = sound;
        } catch (err) {
          console.error(`Error precargando ${song.title}:`, err);
        }
      }
    };

    preloadSounds();

    return () => {
      Object.values(soundRefs.current).forEach((sound) => sound.unloadAsync());
    };
  }, []);

  // --- Reproducción ---
  const playSong = async (song: Song) => {
    setIsLoading(true);
    setCurrentSong(song);
    setIsFavorite(false);
    expandPlayer();

    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
      }

      const sound = soundRefs.current[song.id];
      if (!sound) throw new Error("El sonido no está precargado");

      soundRef.current = sound;
      await sound.playAsync();
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (!isSeeking) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis ?? 1);
        }
        if ("didJustFinish" in status && status.didJustFinish) {
          if (repeatMode === 2) {
            sound.playAsync(); // repetir canción
          } else {
            playNext();
          }
        }
      });
    } catch (err) {
      console.error("Error reproduciendo canción:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;
    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  // --- Avanzar / retroceder canciones ---
  const playNext = () => {
    let nextIndex = songs.findIndex((s) => s.id === currentSong.id) + 1;
    if (isShuffleOn) {
      nextIndex = Math.floor(Math.random() * songs.length);
    }
    if (nextIndex >= songs.length) {
      if (repeatMode === 1) nextIndex = 0;
      else return setIsPlaying(false);
    }
    playSong(songs[nextIndex]);
  };

  const playPrev = () => {
    let prevIndex = songs.findIndex((s) => s.id === currentSong.id) - 1;
    if (isShuffleOn) {
      prevIndex = Math.floor(Math.random() * songs.length);
    }
    if (prevIndex < 0) {
      if (repeatMode === 1) prevIndex = songs.length - 1;
      else return;
    }
    playSong(songs[prevIndex]);
  };

  // --- Animaciones del player ---
  const expandPlayer = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const collapsePlayer = () => {
    Animated.spring(translateY, {
      toValue: screenHeight - 80,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const toggleRepeat = () => setRepeatMode((prev) => (prev + 1) % 3);
  const toggleShuffle = () => setIsShuffleOn((prev) => !prev);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) collapsePlayer();
        else expandPlayer();
      },
    })
  ).current;

  // --- Cleanup ---
  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  // --- UI ---
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16, paddingVertical: 24 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={{ marginBottom: 24 }}>
          <Text style={{ height: 20 }} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <CustomText variant="titleSPOTY" value="Hola, JUANJO" />
          <Text style={{ color: "#fff", fontSize: 20 }}>🎧</Text>
        </View>

        <CustomText variant="title" value="Destacadas" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 16 }}>
          {playlists.map((pl) => (
            <TouchableOpacity key={pl.id} style={{ marginRight: 16, width: 160, height: 160, backgroundColor: "#1a1a1a", borderRadius: 12, overflow: "hidden" }}>
              <Image source={pl.image} style={{ width: "100%", height: "100%", borderRadius: 12 }} contentFit="cover" transition={300} />
              <View style={{ position: "absolute", bottom: 8, left: 8 }}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>{pl.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <CustomText variant="title" value="Populares" />
        <View style={{ marginTop: 16 }}>
          {songs.map((song) => (
            <TouchableOpacity
              key={song.id}
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
              onPress={() => playSong(song)}
            >
              {song.image ? (
                <Image source={song.image} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 16 }} contentFit="cover" transition={300} />
              ) : (
                <View style={{ width: 48, height: 48, borderRadius: 8, marginRight: 16, backgroundColor: "#374151" }} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>{song.title}</Text>
                <Text style={{ color: "#9CA3AF", fontSize: 14 }}>{song.artist}</Text>
              </View>
              <Ionicons name="play-circle" size={28} color="#7FBCD2" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Player expandible */}
      <Animated.View style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: screenHeight, transform: [{ translateY }] }} {...panResponder.panHandlers}>
        <LinearGradient colors={["#4a1a1a", "#2a0a0a", "#000000"]} style={{ flex: 1 }}>
          {/* Mini Player */}
          <TouchableOpacity
            onPress={expandPlayer}
            style={{ height: 80, backgroundColor: "#282828", paddingHorizontal: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#404040", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              {currentSong.image ? (
                <Image source={currentSong.image} style={{ width: 48, height: 48, borderRadius: 4, marginRight: 12 }} contentFit="cover" />
              ) : (
                <View style={{ width: 48, height: 48, borderRadius: 4, marginRight: 12, backgroundColor: "#374151" }} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }} numberOfLines={1}>
                  {currentSong.title}
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }} numberOfLines={1}>
                  {currentSong.artist}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#A494D8" : "white"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePlayPause}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Player expandido */}
          <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20 }}>
            <TouchableOpacity onPress={collapsePlayer} style={{ alignSelf: "flex-start", marginBottom: 20 }}>
              <Ionicons name="chevron-down" size={32} color="white" />
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Image source={currentSong.image} style={{ width: screenWidth - 80, height: screenWidth - 80, borderRadius: 8 }} contentFit="cover" />
            </View>

            <View style={{ marginTop: 32, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#d6c6b8", fontSize: 24, fontWeight: "bold" }} numberOfLines={1}>
                  {currentSong.title}
                </Text>
                <Text style={{ color: "#FFFF00", fontSize: 16, marginTop: 4 }}>{currentSong.artist}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={isFavorite ? "#A494D8" : "white"} />
              </TouchableOpacity>
            </View>

            <Slider
              style={{ width: "100%", height: 40, marginTop: 24 }}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              minimumTrackTintColor="#A494D8"
              maximumTrackTintColor="#444"
              thumbTintColor="#A494D8"
              onSlidingStart={() => setIsSeeking(true)}
              onSlidingComplete={async (value) => {
                if (isLoading || !soundRef.current) return;
                setIsSeeking(false);
                const status = await soundRef.current.getStatusAsync();
                if (status.isLoaded) await soundRef.current.setPositionAsync(value);
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: -8 }}>
              <Text style={{ color: "#aaa", fontSize: 12 }}>{new Date(position).toISOString().substring(14, 19)}</Text>
              <Text style={{ color: "#aaa", fontSize: 12 }}>{new Date(duration).toISOString().substring(14, 19)}</Text>
            </View>

            {/* Controles */}
            <View style={{ marginTop: 32, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
              <TouchableOpacity onPress={toggleShuffle}>
                <MaterialIcons name="shuffle" size={36} color={isShuffleOn ? "#A494D8" : "white"} />
              </TouchableOpacity>

              <TouchableOpacity onPress={playPrev}>
                <Ionicons name="play-skip-back" size={36} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={togglePlayPause} style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="red" />
              </TouchableOpacity>

              <TouchableOpacity onPress={playNext}>
                <Ionicons name="play-skip-forward" size={36} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleRepeat}>
                <Ionicons
                   name={repeatMode === 2 ? "repeat-one" as any : repeatMode === 1 ? "repeat" : "repeat-outline"}
  size={36}
  color={repeatMode !== 0 ? "#A494D8" : "white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default DashboardScreen;
