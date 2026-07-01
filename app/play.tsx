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
import { Dimensions } from "react-native";
import Pipe from "@/Components/Pipe";
import { CAP_HEIGHT, GAP_SIZE } from "@/Constants/pipe";


interface Obstacle {
  id: string;
  gapY: number;
}

export default function Play() {

  const { height } = Dimensions.get("window");
  const jumpSound = useAudioPlayer(require("@/assets/Sounds/NPC_Hit_1.wav"))
  const soundtrack = useAudioPlayer(require("@/assets/Sounds/soundtrack.mp3"))
  const pointSound = useAudioPlayer(require("@/assets/Sounds/wing.mp3"))


  const [obstacles, setObstacles] = useState([] as Obstacle[]);

    function handleJump() {
      try {
        jumpSound.seekTo(0);
        jumpSound.volume = 1.0;
        jumpSound.play();
      } catch (error) {

      }
    }


    function spawnObstacle() {
      setObstacles((oldValue) => [...oldValue,{ id: Date.now().toString(), gapY: randomGapY() }])
    }

    function removeObstacle(id: string) {
      setObstacles((oldValue) => oldValue.filter((item) => item.id !== id))
      try {
        pointSound.seekTo(0)
        pointSound.play()
    } catch (error) {
        
      }
    } 

    function randomGapY() {
      const min = CAP_HEIGHT + GAP_SIZE / 2;
      const max = height - CAP_HEIGHT - GAP_SIZE / 2;
      return Math.random() * (max - min) + min;
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
            style={[styles.eye, { transform: [{ scaleX: -1 }] }]}
        />

        {obstacles.map((obstacle) => 
          <Pipe 
            key={obstacle.id} 
            gapY={obstacle.gapY} 
            onEnd={() => removeObstacle(obstacle.id)}
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
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  }

});
