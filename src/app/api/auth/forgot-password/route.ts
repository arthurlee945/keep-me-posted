import { NextResponse } from "next/server";
import { generateRandomToken } from "@/utils/functions/authUtils";
import { sendEmail } from "@/utils/functions/mailer";
import { prisma } from "@/utils/database/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: Request) {
    const { email } = (await req.json()) as { email: string };
    if (!email) return new NextResponse("Please include valid request", { status: 400 });
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) return new NextResponse("User does not exist", { status: 400 });
        const { token, hashedToken, expires } = generateRandomToken();
        const emailRes = await sendEmail({
            to: email,
            subject: "Reset password reqeust for Keep Me Posted!",
            text: `
            Please click on link provided to reset your password\n
            ${process.env.APP_URL}/auth/reset-password?token=${token} \n
            Token will expire in 10 mins.\n
            If you didn't request to reset your password for "Keep Me Posted", please ignore this email!
            `,
        });
        if (emailRes.status !== "success") return new NextResponse("Failed sending reset email", { status: 500 });
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: new Date(expires),
            },
        });
        return NextResponse.json({ status: "successful", message: "please check your email" });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            return new NextResponse("Failed updating server", { status: 500 });
        }
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}
