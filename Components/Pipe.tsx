import { CAP_HEIGHT, GAP_SIZE, PIPE_WIDTH } from "@/Constants/pipe";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { Image } from "react-native";

interface Props {
    gapY: number;
    onEnd: () => void;
}


export default function Pipe({ gapY, onEnd }: Props) {
    const { height, width } = Dimensions.get("window");
    const topHeight = gapY - GAP_SIZE / 2;
    const bottomY = gapY + GAP_SIZE / 2;
    const bottonHeight = height - bottomY;

    const translateX = useSharedValue(0);

    const animetedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: -translateX.value}]
    }))

    useEffect(() => {
        translateX.value = withTiming(
            width,
            {
                duration: 4000,
                easing: Easing.linear
            },
            () => runOnJS(onEnd)(),
        )
    }, [translateX])

    return ( 
      <>
        <Animated.View style={[styles.pipe, {left: width, top: 0, height: topHeight}, animetedStyle]} 
        > <Image source={require("@/assets/images/pipe.webp")} style={styles.image} /> </Animated.View>
        <Animated.View style={[styles.cap, {left: width -5, top: topHeight - CAP_HEIGHT}, animetedStyle]}>
            <Image source={require("@/assets/images/cap.webp")} style={styles.image} />
        </Animated.View>

        <Animated.View style={[styles.pipe, {left: width, top: bottomY, height: bottonHeight}, animetedStyle]} 
        > <Image source={require("@/assets/images/pipe.webp")} style={styles.image} /> </Animated.View>
        <Animated.View style={[styles.cap, {left: width -5, top: bottomY}, animetedStyle]}>
            <Image source={require("@/assets/images/cap.webp")} style={[styles.image, {transform: [{rotate: "180deg"}]}]} />
        </Animated.View>
      </>
    )
}

const styles = StyleSheet.create({
    pipe: {
        position: "absolute",
        width: PIPE_WIDTH,

    },

    cap: {
        position: "absolute",
        width: PIPE_WIDTH + 10,
        height: CAP_HEIGHT,

    },

    image: {
        width: "100%",
        height: "100%",

    }
})