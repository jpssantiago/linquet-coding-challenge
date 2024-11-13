import { fastify } from "fastify"

const app = fastify()

app.register(import("./modules/auth/auth.controller"))

app.listen({
    port: 3001
}, () => console.log("Server running on port 3001 🔥"))