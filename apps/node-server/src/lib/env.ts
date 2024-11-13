import { z } from "zod"
import "dotenv/config"

const envSchema = z.object({
    JWT_SECRET: z.string(),
    BCRYPT_SALT_ROUNDS: z.coerce.number()
})

export const env = envSchema.parse(process.env)