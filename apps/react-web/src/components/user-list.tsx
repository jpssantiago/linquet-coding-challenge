"use client"

import { useEffect } from "react"
import { Loader2, User } from "lucide-react"

import { useChatStore } from "@/stores/chat.store"
import { Chat } from "@/models/chat"
import { cn } from "@/lib/utils"
import { LogoutButton } from "./logout-button"

export function UserList() {
    const chatStore = useChatStore()

    function handleClick(chat: Chat) {
        chatStore.selectChat(chat)
    }

    useEffect(() => {
        chatStore.fetchChats().then(chats => {
            if (chats) {
                chatStore.selectChat(chats[0])
            }
        })
    }, [])

    return (
        <div className="flex flex-col justify-between space-y-2 bg-zinc-100 p-5 border w-80 h-full">
            {chatStore.chats ? (
                <div className="space-y-1">
                    {chatStore.chats.map((chat, index) => (
                        <div
                            key={index}
                            className={cn("flex items-center space-x-4 px-5 rounded-md w-full h-16 transition-all hover:bg-zinc-200 cursor-pointer", chat.user.id == chatStore.activeChat?.user.id && "bg-zinc-200")}
                            onClick={() => handleClick(chat)}
                        >
                            <div className="flex justify-center items-center bg-zinc-300 rounded-full min-w-11 min-h-11">
                                <User className="text-zinc-600" />
                            </div>

                            <div className="space-y-0.5">
                                <p className="font-medium text-[15px]">
                                    {chat.user.name}
                                </p>

                                <p className="line-clamp-1 text-ellipsis text-xs text-zinc-600">
                                    {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : "Say hi 👋"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center size-full">
                    <Loader2
                        className="text-blue-500 transition-all animate-spin"
                    />
                </div>
            )}

            <LogoutButton />
        </div>
    )
}