import { authOptions } from '@/utils/auth/auth';
import { prisma } from '@/utils/database/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email)
        return NextResponse.json({ status: 'failed', message: 'User is not logged in' }, { status: 402 });
    const { page } = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
                projects: {
                    select: {
                        id: true,
                        title: true,
                        createdAt: true,
                        visitedAt: true,
                    },
                    orderBy: {
                        visitedAt: { sort: 'asc', nulls: 'first' },
                    },
                    skip: 4 * (page - 1),
                    take: 4,
                },
            },
        });
        if (!user) return NextResponse.json({ status: 'failed', message: 'User does not exist' }, { status: 400 });
        return NextResponse.json({
            status: 'success',
            projects: user.projects,
        });
    } catch (err) {
        return NextResponse.json(
            {
                status: 'failed',
                message: "couldn't process your request",
                cause: err,
            },
            { status: 500 }
        );
    }
}
