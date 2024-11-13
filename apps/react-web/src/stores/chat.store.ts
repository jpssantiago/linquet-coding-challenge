import { create } from "zustand"

import { Chat } from "@/models/chat"
import { ChatService, SendMessageResponse } from "@/services/chat.service"

type ChatStoreState = {
    chats: Chat[] | null
    activeChat: Chat | null
}

type ChatStoreActions = {
    fetchChats: () => Promise<Chat[] | null>
    selectChat: (chat: Chat) => void
    sendMessage: (content: string) => Promise<SendMessageResponse>
}

export const useChatStore = create<ChatStoreState & ChatStoreActions>()((set, get) => ({
    chats: null,
    activeChat: null,
    async fetchChats(): Promise<Chat[] | null> {
        const response = await ChatService.getChats()
        if (response.chats) {
            set({ chats: response.chats })

            for (let chat of response.chats) {
                if (chat.user.id == get().activeChat?.user.id) {
                    set({ activeChat: chat })
                }
            }

            return response.chats
        }

        return null
    },
    selectChat(chat: Chat): void {
        set({ activeChat: chat })
    },
    async sendMessage(content: string): Promise<SendMessageResponse> {
        const response = await ChatService.sendMessage(content, get().activeChat!.user.id)
        console.log(response)
        if (response.message) {
            set({
                activeChat: {
                    user: get().activeChat!.user,
                    messages: [...get().activeChat!.messages, response.message]
                }
            })
        }

        return response
    }
}))