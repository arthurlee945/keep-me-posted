import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const password = await hash('qwer1234', 12);
    const account = await prisma.$transaction(async (tx) => {
        const user = await tx.user.upsert({
            where: { email: 'admin@admin.com' },
            update: {
                password,
            },
            create: {
                name: 'admin',
                email: 'admin@admin.com',
                role: Role.ADMIN,
                password,
            },
        });
        if (!user) return;
        const account = await tx.account.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                provider: 'credneital',
                type: 'email',
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
        return account;
    });
    // const user = await prisma.user.upsert({
    //     where: { email: "admin@admin.com" },
    //     update: {
    //         password,
    //     },
    //     create: {
    //         name: "admin",
    //         email: "admin@admin.com",
    //         role: Role.ADMIN,
    //         password,
    //     },
    // });
}

(async () => {
    try {
        await main();
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
})();
