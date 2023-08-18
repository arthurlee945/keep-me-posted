import { authOptions } from '@/utils/auth/auth';
import { prisma } from '@/utils/database/prisma';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function POST() {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse('Unauthorized', { status: 401 });
    try {
        await prisma.$transaction(async (tx) => {
            if (!session.user || !session.user.email)
                return new NextResponse('You are not logged in', {
                    status: 400,
                });
            const user = await tx.user.findUnique({
                where: {
                    email: session.user?.email,
                },
                select: {
                    id: true,
                },
            });
            if (!user)
                return NextResponse.json({
                    status: 'successful',
                    message: 'user does not exists',
                });
            await tx.user.delete({
                where: {
                    id: user.id,
                },
            });
        });
        cookies().delete('next-auth.session-token');
        return NextResponse.json({
            status: 'successful',
            message: 'user deleted',
        });
    } catch (err) {
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}
