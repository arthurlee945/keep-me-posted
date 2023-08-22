import DependencyDisplay from '@/components/Modules/DependencyDisplay';
import DeleteProjectButton from '@/components/subComponents/projectsPart/DeleteProjectButton';
import { authOptions } from '@/utils/auth/auth';
import { prisma } from '@/utils/database/prisma';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Keep Me Posted | Project Page',
    description: 'Project Page',
};

const getProjectData = async (projectId: string) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) return { status: 'failed' };
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
            },
        });

        if (!user) return { status: 'failed' };
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
        return { status: 'success', data: project };
    } catch (err) {
        redirect('/projects');
    }
};

const ProjectPage = async ({ params: { id } }: { params: { id: string } }) => {
    if (!id) redirect('/projects');
    const projData = await getProjectData(id);
    if (projData.status !== 'success' || !projData.data) {
        return (
            <main className="flex flex-1 px-8 py-5 justify-center items-center flex-col">
                <h1 className="font-semibold text-3xl mb-6 mobile:text-xl">Sorry, Something went wrong</h1>
                <Link
                    className="border-[1px] py-2 px-4 rounded-[5px] transition-[letter-spacing] hover:tracking-wider font-semibold"
                    href="/projects"
                >
                    Go Back
                </Link>
            </main>
        );
    }
    const {
        data: { title, ...deps },
    } = projData;
    return (
        <main className="flex flex-1 px-8 py-5 flex-col gap-y-7 tablet:px-5 mobile:px-3">
            <section className="flex items-center justify-between">
                <h1 className="font-semibold text-3xl mobile:text-xl">{title}</h1>
                <DeleteProjectButton projectId={id} />
            </section>
            <DependencyDisplay deps={deps} />
        </main>
    );
};

export default ProjectPage;
