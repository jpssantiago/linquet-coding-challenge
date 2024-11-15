export type SignInResponse = {
    token?: string
    error?: string
}

export type SignUpResponse = {
    token?: string
    error?: string
}

export const AuthService = {
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
}