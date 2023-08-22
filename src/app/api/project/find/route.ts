import { authOptions } from '@/utils/auth/auth';
import { prisma } from '@/utils/database/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email)
        return NextResponse.json({ status: 'failed', message: 'User is not logged in' }, { status: 402 });
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    if (!projectId) return NextResponse.json({ status: 'failed' }, { status: 400 });
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
            },
        });
        if (!user) return NextResponse.json({ status: 'failed' }, { status: 400 });
        const project = await prisma.project.update({
            where: {
                id: projectId,
                userId: user.id,
            },
            data: {
                visitedAt: new Date(),
            },
            select: {
                title: true,
                dependencies: true,
                devDependencies: true,
                peerDependencies: true,
            },
        });
        if (!project)
            return NextResponse.json(
                {
                    status: 'failed',
                    message: "There's no project under that ID",
                },
                { status: 400 }
            );
        return NextResponse.json({
            status: 'success',
            data: {
                title: project.title,
                dependencies: project.dependencies,
                devDependencies: project.devDependencies,
                peerDependencies: project.peerDependencies,
            },
        });
    } catch (err) {
        return NextResponse.json(
            {
                status: 'failed',
                message: "Sorry, We couldn't get your project fro the server.",
                cause: err,
            },
            { status: 500 }
        );
    }
}
