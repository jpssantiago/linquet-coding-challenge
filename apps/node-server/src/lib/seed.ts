import { prisma } from "./prisma"

async function run() {
    const joao = await prisma.user.upsert({
        where: { email: 'joao@joaosantiago.com.br' },
        update: {},
        create: {
            email: 'joao@joaosantiago.com.br',
            name: 'João',
            password: "$2a$12$NkQsYegkam7wllh5/BhfPu/mhJZ/KGU6hta0mXPVd7DuqsZpvYa6G", // password
        },
    })
    
    const mark = await prisma.user.upsert({
        where: { email: 'mark@zuckerberg.com' },
        update: {},
        create: {
            email: 'mark@zuckerberg.com',
            name: 'Mark',
            password: "$2a$12$aDimgtDezlkAHKBO9z7ESuxLkamWEtoirnOmx0xDT9my77KPrac.W", // password12345
        },
    })
    
    console.log(joao, mark)
}

run()