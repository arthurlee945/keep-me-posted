import { prisma } from '@/utils/database/prisma';
import { hashToken } from '@/utils/functions/authUtils';
import { NextResponse } from 'next/server';

type verifyType = { token: string };
export async function POST(req: Request) {
    const { token } = (await req.json()) as verifyType;
    if (!token) return new NextResponse('Please Provide Token', { status: 400 });
    try {
        const user = await prisma.user.findFirst({
            where: {
                emailVerificationToken: hashToken(token),
            },
        });
        if (!user)
            return new NextResponse(
                JSON.stringify({
                    status: 'failed',
                    message: 'Invalid Token or User has Already Been Verified',
                }),
                {
                    status: 400,
                }
            );
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerificationToken: '',
                emailVerified: true,
            },
            select: {
                id: true,
            },
        });
        return NextResponse.json({
            status: 'successful',
            message: 'You have successfully verified your email!',
        });
    } catch (err) {
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}
