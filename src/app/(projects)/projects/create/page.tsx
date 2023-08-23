import CreateProjectForm from '@/components/subComponents/projectsPart/CreateProjectForm';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
    title: 'Keep Me Posted | Create Project Page',
    description: 'Create Project to be monitored here',
};

interface CreateProjectProps {}

const CreateProject: FC<CreateProjectProps> = () => {
    return (
        <main className="flex w-full flex-1 items-center justify-center p-5">
            <CreateProjectForm />
        </main>
    );
};

export default CreateProject;
