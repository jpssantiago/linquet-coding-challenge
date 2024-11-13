import { useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import { sendMessageSchema } from "../schemas/message.schemas"
import { useChatStore } from "../stores/chat.store"

type SendMessageContainerProps = {
    receiverId: string
}

export function SendMessageContainer({ receiverId }: SendMessageContainerProps) {
    const [newMessage, setNewMessage] = useState("")

    const chatStore = useChatStore()

    async function sendMessage() {
        const { data, error } = sendMessageSchema.safeParse({ content: newMessage })
        if (!data) {
            return Alert.alert(
                "Something went wrong",
                error.errors[0].message,
                [{ text: "OK" }]
            )
        }

        const response = await chatStore.sendMessage(newMessage, receiverId)
        if (response.error) {
            return Alert.alert(
                "Something went wrong",
                response.error,
                [{ text: "OK" }]
            )
        }

        setNewMessage("")
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type a message"
                multiline
            />
            <TouchableOpacity
                style={styles.sendButton}
                onPress={sendMessage}
                disabled={!newMessage}
            >
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 24
    },
    input: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        maxHeight: 100
    },
    sendButton: {
        backgroundColor: "#007AFF",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    sendButtonText: {
        color: "#fff",
        fontWeight: "500"
    }
})