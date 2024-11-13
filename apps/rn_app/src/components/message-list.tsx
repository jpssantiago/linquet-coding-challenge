import { FlatList, StyleSheet, Text, View } from "react-native"

import { Message } from "../models/message"
import { useAuthStore } from "../stores/auth.store"

type MessageListProps = {
    messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
    const authStore = useAuthStore()

    return (
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={[
                    styles.messageContainer,
                    item.senderId === authStore.id ? styles.sentMessage : styles.receivedMessage
                ]}>
                    <Text style={[
                        styles.messageText,
                        item.senderId === authStore.id ? styles.sentMessageText : styles.receivedMessageText
                    ]}>
                        {item.content}
                    </Text>
                    <Text style={[
                        styles.timestamp,
                        item.senderId === authStore.id ? styles.sentTimestamp : styles.receivedTimestamp
                    ]}>
                        {(item.createdAt ? new Date(item.createdAt) : new Date()).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        margin: 8,
        padding: 12,
        borderRadius: 16,
        maxWidth: "80%"
    },
    sentMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#007AFF"
    },
    receivedMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#E5E5EA"
    },
    messageText: {
        fontSize: 16
    },
    sentMessageText: {
        color: "#fff"
    },
    receivedMessageText: {
        color: "#000"
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4
    },
    sentTimestamp: {
        color: "rgba(255, 255, 255, 0.7)",
        textAlign: "right"
    },
    receivedTimestamp: {
        color: "#666"
    },
})