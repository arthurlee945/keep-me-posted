'use client';
import { FC } from 'react';

interface DeleteProjectButtonProps {
    projectId: string;
}

const DeleteProjectButton: FC<DeleteProjectButtonProps> = ({ projectId }) => {
    return <button>{projectId}</button>;
};

export default DeleteProjectButton;
