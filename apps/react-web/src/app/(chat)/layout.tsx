"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { useAuthStore } from "@/stores/auth.store"

type ChatLayoutProps = {
    children?: ReactNode
}

export default function ChatLayout({ children }: ChatLayoutProps) {
    const [loading, setLoading] = useState<boolean>(true)

    const authStore = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        async function run() {
            if (!authStore.hasToken()) {
                return router.push("/auth/sign-in")
            }
            
            if (authStore.hasToken()) {
                const response = await authStore.authenticate()
                if (response.error) {
                    return router.push("/auth/sign-in")
                }
            }
    
            setLoading(false)
        }

        run()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center w-dvw h-dvh">
                <Loader2
                    className="text-blue-500 transition-all animate-spin size-10"
                />
            </div>
        )
    }

    return children
}