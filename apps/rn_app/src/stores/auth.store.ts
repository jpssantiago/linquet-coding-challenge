import { create } from "zustand"
import { jwtDecode } from "jwt-decode"

import { AuthService, SignInResponse, SignUpResponse } from "../services/auth.service"
import { deleteToken, getToken, saveToken } from "../utils/token-utils"

type AuthStoreState = {
    hasToken: boolean
    id: string | null
}

type AuthStoreActions = {
    signUp: (email: string, password: string, name: string) => Promise<SignUpResponse>
    signIn: (email: string, password: string) => Promise<SignInResponse> 
    authenticate: () => Promise<void> 
    logOut: () => void
}

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()((set) => ({
    hasToken: !!getToken(),
    id: null,
    async signUp(email: string, password: string, name: string): Promise<SignUpResponse> {
        const response = await AuthService.signUp(email, password, name)
        if (response.token) {
            saveToken(response.token)

            const payload = jwtDecode(response.token)
            if (payload) {
                set({ id: payload.sub as string })
            }
        }

        return response
    },
    async signIn(email: string, password: string): Promise<SignInResponse> {
        const response = await AuthService.signIn(email, password)
        if (response.token) {
            saveToken(response.token)

            const payload = jwtDecode(response.token)
            if (payload) {
                set({ id: payload.sub as string })
            }
        }

        return response
    },
    async authenticate(): Promise<void> {

    },
    logOut() {
        deleteToken()
        set({ id: null })
    }
}))