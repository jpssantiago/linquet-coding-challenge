"use client"

import { useChatStore } from "@/stores/chat.store"
import { UserList } from "@/components/user-list"
import { SendMessageForm } from "@/components/forms/send-message-form"
import { Chat } from "@/components/chat"

export const dynamic = "force-dynamic"

export default function ChatPage() {
    const chatStore = useChatStore()

    return (
        <div className="flex w-dvw h-dvh">
            <UserList />

            <div className="flex flex-col w-full">
                <div className="flex space-x-1 p-5 border-b">
                    <p>
                        To: 
                    </p>

                    <strong>
                        {chatStore.activeChat?.user.name}
                    </strong>
                </div>

                <div className="flex flex-col space-y-4 p-5 h-full overflow-hidden">
                    <Chat />

                    <SendMessageForm />
                </div>
            </div>
        </div>
    )
}