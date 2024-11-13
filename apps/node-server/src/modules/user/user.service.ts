import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { User } from "@prisma/client"

import { prisma } from "../../lib/prisma"

type CreateUserResponse = {
    user?: User
    error?: string
    statusCode?: number
}

type FindUserResponse = {
    user?: User
    error?: string
    statusCode?: number
}

export const UserService = {
    async create(email: string, hash: string, name: string): Promise<CreateUserResponse> {
        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hash,
                    name
                }
            })

            return { user }
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                return {
                    error: "Email already in use",
                    statusCode: 409
                }
            }

            return {
                error: "Could not create an user",
                statusCode: 500
            }
        }
    },

    async findByEmail(email: string): Promise<FindUserResponse> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return {
                error: "User does not exist",
                statusCode: 404
            }
        }

        return {
            user
        }
    },

    async findById(id: string): Promise<FindUserResponse> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return {
                error: "User does not exist",
                statusCode: 404
            }
        }

        return {
            user
        }
    }
}