import { prisma } from '@/utils/database/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type ProjectCreateProps = { title: string; packageData: string };
export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) return NextResponse.json('You are not signed in', { status: 402 });
    const { title, packageData } = (await req.json()) as ProjectCreateProps;
    try {
        const { dependencies, devDependencies, peerDependencies } = JSON.parse(packageData);
        if (!dependencies && !devDependencies && !peerDependencies)
            return NextResponse.json('There are no dependencies listed', { status: 400 });
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
            },
        });
        if (!user) return NextResponse.json('There is no user with your credential', { status: 400 });
        const project = await prisma.project.create({
            data: {
                userId: user.id,
                title,
                dependencies: dependencies,
                devDependencies: devDependencies,
                peerDependencies: peerDependencies,
            },
            select: {
                id: true,
            },
        });

        return NextResponse.json({ status: 'success', projectId: project.id });
    } catch (err) {
        return NextResponse.json('something went wrong processing your project', { status: 500 });
    }
}
