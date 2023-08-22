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
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <CreateProjectForm />
        </main>
    );
};

export default CreateProject;
