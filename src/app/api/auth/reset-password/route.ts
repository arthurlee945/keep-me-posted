import { prisma } from "@/utils/database/prisma";
import { hashToken } from "@/utils/functions/authUtils";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

type ResetPasswordProps = {
    password: string;
    token: string;
};

export async function POST(req: Request) {
    const { password, token } = (await req.json()) as ResetPasswordProps;
    if (!password || !token) return new NextResponse("Please include valid request", { status: 400 });
    try {
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: hashToken(token),
            },
            select: {
                id: true,
                resetPasswordExpires: true,
            },
        });
        if (!user) return new NextResponse("Please provide a valid token", { status: 402 });
        if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date())
            return new NextResponse("Token is expired", { status: 402 });
        const hashed_password = await hash(password, 12);
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                passwordChangedAt: new Date(),
                password: hashed_password,
                resetPasswordExpires: null,
                resetPasswordToken: null,
            },
        });
        return NextResponse.json({
            status: "successful",
            message: "Password has been reset!",
        });
    } catch (err) {
        return new NextResponse(JSON.stringify({ status: "failed", message: "Something Went Wrong", cause: err }), { status: 500 });
    }
}
