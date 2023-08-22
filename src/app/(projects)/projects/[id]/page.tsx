import DependencyDisplay from '@/components/Modules/DependencyDisplay';
import DeleteProjectButton from '@/components/subComponents/projectsPart/DeleteProjectButton';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Keep Me Posted | Project Page',
    description: 'Project Page',
};

const getProjectData = async (projectId: string) => {
    try {
        const res = await fetch(`${process.env.APP_URL}/api/project/find?projectId=${projectId}`, { cache: 'no-cache' });
        return res.json();
    } catch (err) {
        redirect('/projects');
    }
};

const ProjectPage = async ({ params: { id } }: { params: { id: string } }) => {
    if (!id) redirect('/projects');
    const projData = await getProjectData(id);
    if (projData.status !== 'success') {
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
