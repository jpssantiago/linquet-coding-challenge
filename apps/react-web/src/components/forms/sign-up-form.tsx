"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { signUpSchema, SignUpSchemaType } from "@/schemas/auth.schemas"
import { useAuthStore } from "@/stores/auth.store"
import { Alert, AlertDescription } from "../ui/alert"
import { Form, FormField, FormItem, FormMessage } from "../ui/form"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { LoadingButton } from "../ui/loading-button"
import { UnderlineLink } from "../ui/underline-link"

export function SignUpForm() {
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const router = useRouter()
    const authStore = useAuthStore()

    async function onSubmit({ email, password, name }: SignUpSchemaType) {
        const response = await authStore.signUp(email, password, name)
        if (response.error) {
            return form.setError("root", { message: response.error })
        }

        router.push("/chat")
    }

    return (
        <div className="space-y-4">
            <h1 className="font-bold text-2xl">
                Welcome 👋
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {form.formState.errors.root?.message && (
                        <Alert className="border-destructive">
                            <AlertDescription className="text-destructive">
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Email</Label>

                                <Input
                                    placeholder="Email"
                                    className={form.formState.errors.email?.message && "border-destructive"}
                                    {...field}
                                />

                                <FormMessage />
                            </FormItem>
                        )}  
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Password</Label>

                                <Input
                                    placeholder="Password"
                                    type="password"
                                    className={form.formState.errors.password?.message && "border-destructive"}
                                    {...field}
                                />

                                <FormMessage />
                            </FormItem>
                        )}  
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Name</Label>

                                <Input
                                    placeholder="Name"
                                    className={form.formState.errors.name?.message && "border-destructive"}
                                    {...field}
                                />

                                <FormMessage />
                            </FormItem>
                        )}  
                    />

                    <LoadingButton 
                        loading={form.formState.isSubmitting}
                    >
                        Create account
                    </LoadingButton>

                    <div className="flex justify-center items-center space-x-1 text-sm">
                        <p>Already have an account?</p>
                        <UnderlineLink href="/auth/sign-in">Login.</UnderlineLink>
                    </div>
                </form>
            </Form>
        </div>
    )
}