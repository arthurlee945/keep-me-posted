import { prisma } from "@/utils/database/prisma";
import { generateRandomToken } from "@/utils/functions/authUtils";
import { sendEmail } from "@/utils/functions/mailer";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

type SignUp = {
    name: string;
    email: string;
    password: string;
};

export async function POST(req: Request) {
    const { name, email, password } = (await req.json()) as SignUp;
    if (!name || !email || !password) return new NextResponse("please include valid request", { status: 400 });
    try {
        if (
            await prisma.user.findFirst({
                where: { email },
            })
        )
            return new NextResponse("username or email is already in use", { status: 400 });
        const hashed_password = await hash(password, 12);
        const { token, hashedToken } = generateRandomToken();
        const u = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: name.trim(),
                    email: email.trim().toLocaleLowerCase(),
                    password: hashed_password,
                    emailVerificationToken: hashedToken,
                },
            });
            await tx.account.create({
                data: {
                    provider: "credneital",
                    type: "email",
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });
            return user;
        });
        //---------on create send email
        sendEmail({
            to: email,
            subject: "Please Verify Your Email for Keep Me Posted!",
            text: `
            Please click on link provided to verify your email\n
            ${process.env.APP_URL}/auth/verify-email?token=${token} \n
            If you didn't signup for "Keep Me Posted", please ignore this email!
            `,
        });

        return NextResponse.json({ status: "successful", user: { name: u.name, email: u.email } });
    } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
}
