import { create } from "zustand"

import { Chat } from "../models/chat"
import { ChatService, SendMessageResponse } from "../services/chat.service"

type ChatStoreState = {
    chats: Chat[]
}

type ChatStoreActions = {
    fetchChats: () => Promise<Chat[]>
    sendMessage: (content: string, receiverId: string) => Promise<SendMessageResponse> 
}

export const useChatStore = create<ChatStoreState & ChatStoreActions>()((set, get) => ({
    chats: [],
    async fetchChats(): Promise<Chat[]> {
        const response = await ChatService.getChats()
        if (response.chats) {
            set({ chats: response.chats })

            return response.chats
        }

        return []
    },
    async sendMessage(content: string, receiverId: string): Promise<SendMessageResponse> {
        const response = await ChatService.sendMessage(content, receiverId)
        if (response.message) {
            set({
                chats: get().chats.map(chat => {
                    if (chat.user.id == receiverId) {
                        return {
                            ...chat,
                            messages: [...chat.messages, response.message!]
                        }
                    }

                    return chat
                })
            })
        }

        return response
    }
}))