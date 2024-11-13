"use client"

import { useEffect } from "react"

import { useChatStore } from "@/stores/chat.store"
import { MessageItem } from "./message-item"

export function Chat() {
    const chatStore = useChatStore()

    useEffect(() => {
        setInterval(() => {
            chatStore.fetchChats()
        }, 5000)

        return () => {
            console.log("Cleanup: Stopping polling")
        }
    }, [])
    
    return (
        <div className="flex flex-col space-y-6 h-full overflow-y-scroll">
            {chatStore.activeChat?.messages.map(message => (
                <MessageItem
                    key={message.id}
                    message={message}
                />
            ))}
        </div>
    )
}