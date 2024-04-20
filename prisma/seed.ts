import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: '0357dd14-0659-4d17-bf00-dde88840a6e8',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento p/ devs apaixonados por código!',
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log('Database seeded!')
    prisma.$disconnect()
})