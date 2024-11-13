import { ReactNode } from "react"

type AuthLayoutProps = {
    children?: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex justify-center items-center w-dvw h-dvh">
            <div className="w-[350px]">
                {children}
            </div>
        </div>
    )
}