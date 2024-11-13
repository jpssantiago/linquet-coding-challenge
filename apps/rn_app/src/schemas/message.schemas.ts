import { z } from "zod"

export const sendMessageSchema = z.object({
    content: z.string().min(1).max(1500)
})

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema>