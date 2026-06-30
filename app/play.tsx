import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useState } from "react";
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
  const pointSound = useAudioPlayer(require("@/assets/Sounds/wing.mp3"))


  const [obstacles, setObstacles] = useState([] as string[]);

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

    function spawnObstacle() {
      setObstacles((oldValue) => [...oldValue, Date.now().toString()])
    }

    function removeObstacle(id: string) {
      setObstacles((oldValue) => oldValue.filter((item) => item !== id))
      pointSound.seekTo(0)
      pointSound.play()
    }

    useEffect(() => {
      const interval = setInterval(() => spawnObstacle(), 4000 / 4)

      return () => clearInterval(interval)
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
            source={require("@/assets/images/eyegif.gif")}
            style={styles.eye}
        />

        {obstacles.map((obstacle) => 
          <Pipe 
            key={obstacle} 
            gapY={195} 
            onEnd={() => removeObstacle(obstacle)}
          />)}
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
