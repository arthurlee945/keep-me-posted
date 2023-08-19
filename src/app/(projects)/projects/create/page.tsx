import CreateProjectForm from '@/components/subComponents/projectsPart/CreateProjectForm';
import { FC } from 'react';

interface CreateProjectProps {}

const CreateProject: FC<CreateProjectProps> = () => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <CreateProjectForm />
        </main>
    );
};

export default CreateProject;
