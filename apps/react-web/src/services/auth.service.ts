import Cookies from 'js-cookie'

import { User } from "@/models/user"

export type SignUpResponse = {
    token?: string
    error?: string
}

export type SignInResponse = {
    token?: string
    error?: string
}

export type AuthenticateResponse = {
    user?: User
    token?: string
    error?: string
}

export const AuthService = {
    async signUp(email: string, password: string, name: string): Promise<SignUpResponse> {
        try {
            const response = await fetch("http://localhost:3001/api/v1/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            })

            const data = await response.json()

            return {
                token: data.token,
                error: data.error
            }
        } catch {
            return {
                error: "Could not contact the authentication API"
            }
        }
    },

    async signIn(email: string, password: string): Promise<SignInResponse> {
        try {
            const response = await fetch("http://localhost:3001/api/v1/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            return {
                token: data.token,
                error: data.error
            }
        } catch {
            return {
                error: "Could not contact the authentication API"
            }
        }
    },

    async authenticate(): Promise<AuthenticateResponse> {
        try {
            const response = await fetch("http://localhost:3001/api/v1/auth/authenticate", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("lnqt-auth-tkn")}`
                },
            })

            const data = await response.json()

            return {
                user: data.user,
                token: data.token,
                error: data.error
            }
        } catch {
            return {
                error: "Could not contact the authentication API"
            }
        }
    },
}