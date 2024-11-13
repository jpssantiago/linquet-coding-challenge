import { User } from "@prisma/client"

import { HashService } from "../../shared/hash/hash.service"
import { UserService } from "../user/user.service"
import { TokenService } from "../../shared/token/token.service"

type AuthResponse = {
    token?: string
    error?: string
    statusCode?: number
}

type AuthenticateResponse = {
    token?: string
    user?: User
    error?: string
    statusCode?: number
}

export const AuthService = {
    async signIn(email: string, password: string): Promise<AuthResponse> {
        const response = await UserService.findByEmail(email)
        if (response.error || !response.user) {
            return {
                error: response.error,
                statusCode: response.statusCode
            }
        }

        const match = await HashService.comparePasswordWithHash(password, response.user?.password)
        if (!match) {
            return {
                error: "Invalid email or password",
                statusCode: 401
            }
        }

        const token = TokenService.generateToken(response.user.id)
        return { token }
    },

    async signUp(email: string, password: string, name: string): Promise<AuthResponse> {
        const hash = await HashService.hashPassword(password)

        const response = await UserService.create(email, hash, name)
        if (response.error || !response.user) {
            return {
                error: response.error,
                statusCode: response.statusCode
            }
        }

        const token = TokenService.generateToken(response.user!.id)
        return { token }
    },

    async authenticate(token: string): Promise<AuthenticateResponse> {
        const id = TokenService.validateToken(token)
        if (!id) {
            return {
                error: "Authorization token is invalid",
                statusCode: 401
            }
        }

        const response = await UserService.findById(id)
        if (response.error || !response.user) {
            return {
                error: response.error,
                statusCode: response.statusCode
            }
        }

        const newToken = TokenService.generateToken(response.user.id)
        return {
            token: newToken,
            user: response.user
        }
    }
}