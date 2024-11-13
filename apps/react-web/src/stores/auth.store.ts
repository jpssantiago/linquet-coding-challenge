import { SignUpResponse, SignInResponse, AuthService, AuthenticateResponse } from "@/services/auth.service"
import { create } from "zustand"
import Cookies from 'js-cookie'
import jwt from "jsonwebtoken"

type AuthStoreState = {
    id: string | null
}

type AuthStoreActions = {
    hasToken: () => boolean
    signUp: (email: string, password: string, name: string) => Promise<SignUpResponse>
    signIn: (email: string, password: string) => Promise<SignInResponse>
    authenticate: () => Promise<AuthenticateResponse>
    logOut: () => void
}

function setToken(token: string): void {
    Cookies.set("lnqt-auth-tkn", token)
}

function getToken(): string | undefined {
    return Cookies.get("lnqt-auth-tkn")
}

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()((set) => ({
    hasToken() {
        return !!getToken()
    },
    id: null,
    async signUp(email: string, password: string, name: string): Promise<SignUpResponse> {
        const response = await AuthService.signUp(email, password, name)

        if (response.token) {
            setToken(response.token)

            const payload = jwt.decode(response.token)
            if (payload) {
                set({ id: payload.sub as string })
            }
        }

        return response
    },
    async signIn(email: string, password: string): Promise<SignInResponse> {
        const response = await AuthService.signIn(email, password)
        if (response.token) {
            setToken(response.token)

            const payload = jwt.decode(response.token)
            if (payload) {
                set({ id: payload.sub as string })
            }
        }

        return response
    },
    async authenticate(): Promise<AuthenticateResponse> {
        const response = await AuthService.authenticate()
        if (response.token) {
            setToken(response.token)

            const payload = jwt.decode(response.token)
            set({
                id: payload?.sub as string
            })
        }

        return response
    },
    logOut() {
        Cookies.remove("lnqt-auth-tkn")
    }
}))