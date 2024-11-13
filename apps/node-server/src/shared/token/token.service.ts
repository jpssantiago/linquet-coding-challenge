import jwt, { JwtPayload } from "jsonwebtoken"

import { env } from "../../lib/env"

export const TokenService = {
    generateToken(id: string): string {
        return jwt.sign({ sub: id }, env.JWT_SECRET, { expiresIn: "1d" })
    },

    validateToken(token: string): string | undefined {
        try {
            const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload
            return payload.sub
        } catch {
            return undefined
        }
    }
}