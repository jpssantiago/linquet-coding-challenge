import React, { useEffect, useLayoutEffect } from "react"
import { View, StyleSheet, Button } from "react-native"

import { useChatStore } from "../stores/chat.store"
import { useAuthStore } from "../stores/auth.store"
import { UserList } from "../components/user-list"

export function ChatListScreen({ navigation }: { navigation: any }) {
    const chatStore = useChatStore()
    const authStore = useAuthStore()

    function handleLogout() {
        authStore.logOut()
        navigation.navigate("SignIn")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={handleLogout} title="Log Out" color="#ff5c5c" />
            ),
        })
    }, [navigation])

    useEffect(() => {
        const interval = setInterval(() => {
            chatStore.fetchChats()
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <View style={styles.container}>
            <UserList navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})