import { Loader2 } from "lucide-react"

import { Button, ButtonProps } from "./button"
import { cn } from "@/lib/utils"

type LoadingButtonProps = ButtonProps & {
    loading: boolean
}

export function LoadingButton({ loading, ...rest }: LoadingButtonProps) {
    return (
        <Button className={cn("flex items-center space-x-2 w-full", rest.className)} disabled={loading || rest.disabled}>
            {loading && (
                <Loader2 className="transition-all animate-spin" />
            )}

            {rest.children}
        </Button>
    )
}