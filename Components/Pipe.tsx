import { GAP_SIZE, PIPE_WIDTH } from "@/Constants/pipe";
import { Dimensions, StyleSheet, View } from "react-native";

interface Props {
    gapY: number;

}


export default function Pipe({ gapY }: Props) {
    const { height } = Dimensions.get("window");
    const topHeight = gapY - GAP_SIZE / 2;
    const bottomY = gapY + GAP_SIZE / 2;
    const bottonHeight = height - bottomY;


    return ( 
      <>
        <View style={[styles.pipe, {left: 100, top: 0,
             height: topHeight}]} />

        <View style={[styles.pipe, {left: 100, top: bottomY,
             height: bottonHeight}]} />
      </>
    )
}

const styles = StyleSheet.create({
    pipe: {
        position: "absolute",
        width: PIPE_WIDTH,
        backgroundColor: "#2ecc71",
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: "#0a7433"
    }
})