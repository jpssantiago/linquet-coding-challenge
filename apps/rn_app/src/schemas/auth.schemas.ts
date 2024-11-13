import { z } from "zod"

export const emailSchema = z.string().email({
    message: "The email must be valid"
})

export const passwordSchema = z.string().min(8, {
    message: "The password must be greater than 7 characters"
})

export const nameSchema = z.string().min(1, {
    message: "The name must not be empty"
})

export const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export const signUpSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema
})