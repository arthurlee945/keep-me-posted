import DependencyDisplay from '@/components/Modules/DependencyDisplay';
import DeleteProjectButton from '@/components/subComponents/projectsPart/DeleteProjectButton';
import { redirect } from 'next/navigation';

const getProjectData = async (projectId: string) => {
    try {
        const res = await fetch(`${process.env.APP_URL}/api/project/find?projectId=${projectId}`, { cache: 'no-cache' });
        return res.json();
    } catch (err) {
        return err;
    }
};

const ProjectPage = async ({ params: { id } }: { params: { id: string } }) => {
    if (!id) redirect('/projects');
    const {
        status,
        data: { title, ...deps },
    } = await getProjectData(id);
    if (status !== 'success') {
        return (
            <main className="flex flex-1 px-8 py-5 justify-center items-center">
                <h1 className="font-semibold text-3xl mobile:text-xl">Sorry, Something went wrong</h1>
            </main>
        );
    }
    return (
        <main className="flex flex-1 px-8 py-5 flex-col gap-y-7 tablet:px-5 mobile:px-3">
            <section>
                <h1 className="font-semibold text-3xl mobile:text-xl">{title}</h1>
                <DeleteProjectButton projectId={id} />
            </section>
            <DependencyDisplay deps={deps} />
        </main>
    );
};

export default ProjectPage;
