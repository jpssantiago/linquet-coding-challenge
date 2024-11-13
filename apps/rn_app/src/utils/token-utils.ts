import AsyncStorage from "@react-native-async-storage/async-storage"

export async function saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem("lnqt-auth-tkn", token)
}

export async function getToken(): Promise<string | null> {
    return await AsyncStorage.getItem("lnqt-auth-tkn")
}

export async function deleteToken(): Promise<void> {
    await AsyncStorage.removeItem("lnqt-auth-tkn")
}