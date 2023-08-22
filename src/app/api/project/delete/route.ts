import { authOptions } from '@/utils/auth/auth';
import { prisma } from '@/utils/database/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const { projectId } = await req.json();
    if (!session || !session.user || !projectId) return NextResponse.json({ status: 'failed' }, { status: 400 });
    try {
        const project = await prisma.project.delete({
            where: {
                id: projectId,
            },
            select: {
                id: true,
            },
        });
        console.log(project);
        if (!project) return NextResponse.json({ status: 'failed', message: "Couldn't delete the project with that id" }, { status: 400 });
        return NextResponse.json({
            status: 'success',
        });
    } catch (err) {
        return NextResponse.json(
            {
                status: 'failed',
                cause: err,
            },
            { status: 500 }
        );
    }
}
