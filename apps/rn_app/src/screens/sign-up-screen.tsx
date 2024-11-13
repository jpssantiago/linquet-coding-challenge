import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"

import { signUpSchema } from "../schemas/auth.schemas"
import { useAuthStore } from "../stores/auth.store"
import { useChatStore } from "../stores/chat.store"

export function SignUpScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const authStore = useAuthStore()
    const chatStore = useChatStore()

    async function handleSignUp() {
        const { data, error } = signUpSchema.safeParse({ email, password, name })
        if (!data) {
            return Alert.alert(
                "Something went wrong",
                error.errors[0].message,
                [{ text: "OK" }]
            )
        }

        const response = await authStore.signUp(email, password, name)
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
            <Text style={styles.title}>Create an account</Text>

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

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.link}>Sign In</Text>
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
        fontSize: 16
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