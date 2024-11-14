import Cookies from 'js-cookie'

import { Chat } from '@/models/chat'
import { Message } from '@/models/message'
import { env } from '@/lib/env'

export type GetChatsResponse = {
    chats?: Chat[]
    error?: string
}

export type SendMessageResponse = {
    message?: Message
    error?: string
}

export const ChatService = {
    async getChats(): Promise<GetChatsResponse> {
        try {
            const response = await fetch(`${env.NEXT_PUBLIC_MSG_API_URL}/api/v1/chats`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("lnqt-auth-tkn")}`
                }
            })

            const data = await response.json()
            return {
                chats: data.chats,
                error: data.error
            }
        } catch {
            return {
                error: "Could not contact the message API"
            }
        }
    },

    async sendMessage(content: string, receiverId: string): Promise<SendMessageResponse> {
        try {
            const response = await fetch(`${env.NEXT_PUBLIC_MSG_API_URL}/api/v1/message`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("lnqt-auth-tkn")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content,
                    receiver: receiverId
                })
            })

            const data = await response.json()
            return {
                message: data.message,
                error: data.errro
            }
        } catch {
            return {
                error: "Could not contact the message API"
            }
        }
    }
}