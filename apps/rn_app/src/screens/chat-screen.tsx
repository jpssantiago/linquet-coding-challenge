import React, { useLayoutEffect } from "react"
import { View, Text, StyleSheet } from "react-native"

import { Message } from "../models/message"
import { User } from "../models/user"
import { useChatStore } from "../stores/chat.store"
import { MessageList } from "../components/message-list"
import { SendMessageContainer } from "../components/send-message-container"
import { NoMessagesIndicator } from "../components/no-messages-indicator"

export function ChatScreen({ route, navigation }: { route: any, navigation: any }) {
    const { user: receiver }: { user: User, messages: Message[] } = route.params
    
    const chatStore = useChatStore()

    const messages = chatStore.chats.find(c => c.user.id == receiver.id)?.messages

    useLayoutEffect(() => {
        navigation.setOptions({
            title: receiver.name
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            {messages && messages.length > 0 ? (
                <MessageList messages={messages} />
            ) : (
                <NoMessagesIndicator />
            )}

            <SendMessageContainer receiverId={receiver.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    }
})