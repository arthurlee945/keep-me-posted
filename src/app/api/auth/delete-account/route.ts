import { prisma } from '@/utils/database/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST() {
    const session = await getServerSession();
    if (!session) return new NextResponse('Unauthorized', { status: 401 });
    try {
        await prisma.$transaction(async (tx) => {
            if (!session.user || !session.user.email)
                throw new Error('Bad Request');
            const user = await tx.user.findUnique({
                where: {
                    email: session.user?.email,
                },
            });
            if (!user) throw new Error('User does not exits');
            await tx.user.delete({
                where: {
                    id: user.id,
                },
            });
        });
    } catch (err) {
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }
}
