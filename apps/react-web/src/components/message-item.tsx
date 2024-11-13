import { Message } from "@/models/message"
import { useAuthStore } from "@/stores/auth.store"
import { cn } from "@/lib/utils"

type MessageItemProps = {
    message: Message
}

export function MessageItem({ message }: MessageItemProps) {
    const authStore = useAuthStore()

    function isTheSender(message: Message): boolean {
        return message.senderId == authStore.id
    }

    return (
        <div className={cn("w-2/3", isTheSender(message) && "flex self-end justify-end pr-3")}>
            <div
                className={cn("bg-zinc-200 p-3 rounded-md w-fit", isTheSender(message) && "bg-blue-500 text-white self-end")}
            >
                {message.content}
            </div>
        </div>
    )
}