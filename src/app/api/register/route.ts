import { prisma } from "@/utils/database/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

type SignUp = {
    name: string;
    email: string;
    password: string;
};

export async function POST(req: Request) {
    const { name, email, password } = (await req.json()) as SignUp;
    if (!(name && password) || !(email && password))
        return new NextResponse(JSON.stringify({ status: "error", message: "please include valid request" }), { status: 400 });
    try {
        if (
            await prisma.user.findFirst({
                where: { OR: [{ name }, { email }] },
            })
        )
            return new NextResponse(JSON.stringify({ status: "error", message: "username or email is already in use" }), { status: 400 });
        const hashed_password = await hash(password, 12);
        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.trim().toLocaleLowerCase(),
                password: hashed_password,
            },
        });
        return NextResponse.json({
            user: {
                name: user.name,
                emai: user.email,
            },
        });
    } catch (err: any) {
        return new NextResponse(JSON.stringify({ status: "error", message: err.message }), { status: 500 });
    }
}
