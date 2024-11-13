import { FastifyInstance } from "fastify"
import { z } from "zod"

import { AuthService } from "./auth.service"

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string()
})

const authenticateSchema = z.object({
    authorization: z.string()
})

export default function(app: FastifyInstance) {
    app.post("/api/v1/auth/sign-in", async (request, res) => {
        const { data: body } = signInSchema.safeParse(request.body)
        if (!body) {
            return res.code(400).send({
                error: "Bad request"
            })
        }

        const response = await AuthService.signIn(body.email, body.password)
        if (response.error) {
            res.code(response.statusCode ?? 500).send({ error: response.error })
        }

        res.send({ token: response.token })
    })

    app.post("/api/v1/auth/sign-up", async (request, res) => {
        const { data: body } = signUpSchema.safeParse(request.body)
        if (!body) {
            return res.code(400).send({
                error: "Bad request"
            })
        }

        const response = await AuthService.signUp(body.email, body.password, body.name)
        if (response.error) {
            res.code(response.statusCode ?? 500).send({ error: response.error })
        }
        
        res.send({ token: response.token })
    })

    app.post("/api/v1/auth/authenticate", async (request, res) => {
        const { data: headers } = authenticateSchema.safeParse(request.headers)
        if (!headers) {
            return res.code(401).send({
                error: "Authorization token must not be empty"
            })
        }

        const token = headers.authorization.split(" ")[1]
        if (!token) {
            return res.code(401).send({
                error: "Authorization token must not be empty"
            })
        }

        const response = await AuthService.authenticate(token)
        if (response.error || !response.user) {
            return res.code(response.statusCode ?? 500).send({ error: response.error })
        }

        res.send({
            user: {
                email: response.user.email,
                name: response.user.name,
            },
            token: response.token
        })
    })
}