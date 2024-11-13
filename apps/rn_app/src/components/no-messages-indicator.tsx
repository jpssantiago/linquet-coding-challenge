import { StyleSheet, Text, View } from "react-native"

export function NoMessagesIndicator() {
    return (
        <View style={styles.container}>
            <Text>Be the first to send a message</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center"
    }
})