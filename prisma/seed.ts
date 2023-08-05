import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const password = await hash("qwer1234", 12);
    const user = await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {
            password,
        },
        create: {
            name: "admin",
            email: "admin@admin.com",
            role: Role.ADMIN,
            password,
        },
    });
    console.log(user);
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
