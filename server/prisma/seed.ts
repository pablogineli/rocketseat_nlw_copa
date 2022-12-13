import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()

async function main(){
    const user =  await prisma.user.create({
        data: {
            name: 'john Doe',
            email: "john_doe@gmail.com",
            avatarUrl:"https://github.com/pablogineli.png"
        }
    })


    const pool = await prisma.pool.create({
        data:{
            title: "Exemplo Pool",
            code: "BOL123",
            ownerId: user.id,

            participants:{
                create:{
                    userId: user.id
                }
            }
        }
        })

    await prisma.game.create({
        data:{
            date: "2022-11-03T22:26:21.309Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR"
        }
    })

    await prisma.game.create({
        data:{
            date: "2022-11-03T22:28:21.309Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses:{
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 3,


                    participant:{
                        connect: {
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main();
