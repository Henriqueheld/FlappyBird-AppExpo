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



export default function Play() {

    const jumpSound = useAudioPlayer(require("@/assets/Sounds/soundtrack.mp3"))

    function handleJump() {
        jumpSound.seekTo(0);
        jumpSound.play();
    }

    useEffect(() => {
        jumpSound.seekTo(0)
        jumpSound.loop = true
        jumpSound.play()

        return () => {
            jumpSound.pause()
        }
    }, [])



  return (
    <ImageBackground
      source={require("@/assets/images/BackGround.png")}
      resizeMode="cover"
      style={styles.background}
    >
    <Pressable onPress={handleJump}>
      <SafeAreaView style={styles.screen}>
        <Image
            source={require("@/assets/images/cuthulhuEye.webp")}
            style={styles.eye}
        />
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
