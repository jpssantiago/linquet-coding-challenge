import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { Chat } from "../models/chat"

type UserListItemProps = {
    navigation: any
    item: Chat
}

export function UserListItem({ navigation, item }: UserListItemProps) {
    return (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate("ChatScreen", {
                user: item.user
            })}
        >
            <Image
                source={{ uri: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" }}
                style={styles.avatar}
            />
            <View style={styles.chatInfo}>
                <View style={styles.topLine}>
                    <Text style={styles.userName}>{item.user.name}</Text>
                    <Text style={styles.timestamp}>
                        {item.messages.length > 0 && (
                            new Date(item.messages[item.messages.length - 1].createdAt).toLocaleTimeString(["en-US"], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        )}
                    </Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.messages.length > 0 ? item.messages[item.messages.length - 1].content : "Send hi 👋"}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chatItem: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        alignItems: "center"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12
    },
    chatInfo: {
        flex: 1
    },
    topLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
    },
    userName: {
        fontSize: 16,
        fontWeight: "500"
    },
    lastMessage: {
        fontSize: 14,
        color: "#666"
    },
    timestamp: {
        color: "#666"
    }
})