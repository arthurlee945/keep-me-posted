'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface DeleteProjectButtonProps {
    projectId: string;
}

const DeleteProjectButton: FC<DeleteProjectButtonProps> = ({ projectId }) => {
    const router = useRouter();
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const handleDeleteProject = async () => {
        if (!projectId) return;
        setIsSendingRequest(true);
        try {
            const deleteRes = await axios.post('/api/project/delete', { projectId });
            if (deleteRes.status === 200) router.push('/projects');
            else setIsSendingRequest(false);
        } catch (err) {
            console.error(err);
            setIsSendingRequest(false);
        }
    };
    return (
        <button
            className="w-fit self-end rounded-lg border-[1px] border-red-600 bg-transparent px-8 py-2 font-semibold text-red-600 transition-[border-color,background-color,color] hover:border-transparent hover:bg-red-600 hover:text-zinc-50 mobile:px-6 mobile:text-sm"
            onClick={handleDeleteProject}
            disabled={isSendingRequest}
        >
            {isSendingRequest ? 'Deleting...' : 'Delete Project'}
        </button>
    );
};

export default DeleteProjectButton;
