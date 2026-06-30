import GradientText from "@/Components/GradientText";
import MovingBackground from "@/Components/Movingbackground";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {
  return (
    <ImageBackground
      source={require("@/assets/images/BackGround.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.titleWrapper}>
          <Image
            source={require("@/assets/images/cuthulhuEye.webp")}
            style={styles.titleImage}
          />
          <GradientText
           colors={["#ff4444", "#441e1e"]}
           style={styles.title}
           
           >
            Flappy Eye
           </GradientText>
        </View>
        <Link href="/play" asChild>
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={["#be5353", "#662a2a"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Play Game</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>

      </SafeAreaView>
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

  title: {
    fontSize: 90,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.42)",
    textShadowOffset: { width: -5, height: 1 },
    textShadowRadius: 1,
    fontFamily: "MedievalSharp",
  },

  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgb(189, 8, 8)",
    boxShadow: "0px 4px 1px rgba(0, 0, 0, 0.36)",
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -5 }],
  },

  buttonText: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    fontFamily: "Minecraft",
  },

  buttonGradient: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,

    alignItems: "center",
  },
});
