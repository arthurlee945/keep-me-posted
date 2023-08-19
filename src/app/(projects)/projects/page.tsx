import ProjectsList from '@/components/Modules/ProjectsList';
import Link from 'next/link';

export default async function ProjectsPage() {
    return (
        <main className="flex flex-1 px-8 py-5 flex-col gap-y-5 tablet:px-5 mobile:px-3">
            <section className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">My Projects</h1>
                <Link
                    href="/projects/create-project"
                    className={
                        'py-2 px-8 rounded-lg text-blue-600 transition-[border-color,background-color,color] border-[1px] border-blue-600 bg-transparent w-fit self-end font-semibold hover:bg-blue-600 hover:border-transparent hover:text-zinc-50 mobile:px-4'
                    }
                >
                    + Create Project
                </Link>
            </section>
            <ProjectsList />
        </main>
    );
}
