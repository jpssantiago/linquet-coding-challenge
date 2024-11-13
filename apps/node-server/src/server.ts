import { fastify } from "fastify"
import cors from "@fastify/cors"

const app = fastify()

app.register(cors, {})
app.register(import("./modules/auth/auth.controller"))

app.listen({
    port: 3001
}, () => console.log("Server running on port 3001 🔥"))