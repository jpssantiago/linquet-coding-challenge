import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"

import { useAuthStore } from "../stores/auth.store"
import { signInSchema } from "../schemas/auth.schemas"
import { useChatStore } from "../stores/chat.store"

export function SignInScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const authStore = useAuthStore()
    const chatStore = useChatStore()

    async function handleSignIn() {
        const { data, error } = signInSchema.safeParse({ email, password })
        if (!data) {
            return Alert.alert(
                "Something went wrong",
                error.errors[0].message,
                [{ text: "OK" }]
            )
        }

        const response = await authStore.signIn(email, password)
        if (response.error) {
            return Alert.alert(
                "Something went wrong",
                response.error,
                [{ text: "OK" }]
            )
        }

        chatStore.fetchChats()
        navigation.navigate("ChatList")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back 👋</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don"t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 40,
        textAlign: "center"
    },
    inputContainer: {
        gap: 15,
        marginBottom: 30
    },
    input: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        color: "#000"
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },
    footerText: {
        color: "#666",
        fontSize: 14
    },
    link: {
        color: "#007AFF",
        fontSize: 14,
        fontWeight: "600"
    },
})