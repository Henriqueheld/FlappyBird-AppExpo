import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.title}>Flappy Bird</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(27, 24, 32)",
        alignItems: "center"
    },
    
    title: {
        fontSize: 45,
        fontWeight: "bold",
        alignItems: "center",
        color: "rgb(255, 245, 245)",
        backgroundColor: "rgb(45, 40, 53)",
        textAlign: "center",
        width: "105%",
        marginTop: 100,
        borderWidth: 1,
        borderColor: "rgb(255, 255, 255)",
    }
})