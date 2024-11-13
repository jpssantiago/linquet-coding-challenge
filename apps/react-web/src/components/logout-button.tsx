"use client"

import { useAuthStore } from "@/stores/auth.store"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function LogoutButton() {
    const router = useRouter()
    const authStore = useAuthStore()

    function handleClick() {
        authStore.logOut()
        router.push("/auth/sign-in")
    }

    return (
        <div className="w-full">
            <Button className="bg-zinc-300 hover:bg-zinc-400/70 w-full text-zinc-800" onClick={handleClick}>
                Logout
            </Button>
        </div>
    )
}