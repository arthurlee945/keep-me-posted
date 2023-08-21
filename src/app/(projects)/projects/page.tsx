import ProjectsList from '@/components/Modules/ProjectsList';
import { authOptions } from '@/utils/auth/auth';
import { prisma } from '@/utils/database/prisma';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Projects Panel',
    description: 'You can see all your created projects here',
};
export const dynamic = 'force-dynamic';
const getInitialProjects = async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) return { status: 402, message: 'unauthorized' };
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
                take: 4,
            },
        },
    });
    if (!user) return { status: 402, message: 'unauthorized' };
    return { status: 200, message: 'successful', projects: user.projects };
};

export default async function ProjectsPage() {
    const data = await getInitialProjects();
    if (data?.status === 402) signOut({ callbackUrl: '/' });
    return (
        <main className="flex flex-1 px-8 py-5 flex-col gap-y-7 tablet:px-5 mobile:px-3">
            <section className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold mobile:text-xl">My Projects</h1>
                <Link
                    href="/projects/create"
                    className={
                        'py-2 px-8 rounded-lg text-blue-600 transition-[border-color,background-color,color] border-[1px] border-blue-600 bg-transparent w-fit self-end font-semibold hover:bg-blue-600 hover:border-transparent hover:text-zinc-50 mobile:px-6 mobile:text-sm'
                    }
                >
                    + Create Project
                </Link>
            </section>
            <ProjectsList initialData={data.projects} />
        </main>
    );
}
