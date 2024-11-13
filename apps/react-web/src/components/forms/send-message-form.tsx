"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { sendMessageSchema, SendMessageSchemaType } from "@/schemas/message.schemas"
import { useChatStore } from "@/stores/chat.store"
import { Form } from "../ui/form"
import { Input } from "../ui/input"
import { LoadingButton } from "../ui/loading-button"

export function SendMessageForm() {
    const form = useForm<SendMessageSchemaType>({
        resolver: zodResolver(sendMessageSchema),
        defaultValues: {
            content: ""
        }
    })

    const chatStore = useChatStore()

    async function onSubmit({ content }: SendMessageSchemaType) {
        const response = await chatStore.sendMessage(content)
        if (response.error) {
            return // toast() ???
        }

        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center space-x-4 h-10">
                <Input
                    placeholder="Message"
                    className="w-full"
                    {...form.register("content")}
                />

                <LoadingButton 
                    loading={form.formState.isSubmitting} 
                    disabled={!form.formState.isValid}
                    className="px-10 w-fit"
                >
                    Send
                </LoadingButton>
            </form>
        </Form>
    )
}