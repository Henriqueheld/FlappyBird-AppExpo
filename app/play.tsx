import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MovingBackground from "../Components/Movingbackground";
import {useAudioPlayer} from "expo-audio"
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import Pipe from "@/Components/Pipe";



export default function Play() {

  const jumpSound = useAudioPlayer(require("@/assets/Sounds/NPC_Hit_1.wav"))
  const soundtrack = useAudioPlayer(require("@/assets/Sounds/soundtrack.mp3"))
  
    function handleJump() {
        jumpSound.seekTo(0);
        jumpSound.volume = 1.0;
        jumpSound.play();
    }

    useEffect(() => {
        soundtrack.seekTo(0)
        soundtrack.volume = 0.5;
        soundtrack.loop = true
        soundtrack.play()

        return () => {
            soundtrack.pause()
        }
    }, [])



  return (
    <ImageBackground
      source={require("@/assets/images/BackGround.png")}
      resizeMode="cover"
      style={styles.background}
    >
    <Pressable onPress={handleJump} style={styles.background}>
      <SafeAreaView style={styles.screen}>
        <Image
            source={require("@/assets/images/eye2.gif")}
            style={styles.eye}
        />
        <Pipe gapY={300}/>
      </SafeAreaView>
    </Pressable>

      <MovingBackground />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },

  screen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  titleImage: {
    width: 80,
    height: 70,
    marginRight: 12,
  },

  eye: {
    width: 100,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  }

});
