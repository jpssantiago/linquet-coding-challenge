import bcrypt from "bcrypt"

import { env } from "../../lib/env"

export const HashService = {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)
    },

    async comparePasswordWithHash(password: string, hash: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hash)
        } catch {
            return false
        }
    }
}