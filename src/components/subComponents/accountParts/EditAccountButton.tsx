'use client';
import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import UpdateForms from './UpdateForms';

interface EditAccountButtonProps {
    field: 'name' | 'email' | 'password';
    text?: string;
    className?: string;
}

const EditAccountButton: FC<EditAccountButtonProps> = ({ field, text = 'Edit', className }) => {
    const [isEditting, setEditStatus] = useState<boolean>(false);
    const handleInitialBtnClick = (open: boolean) => {
        setEditStatus(open);
        document.body.setAttribute('style', open ? 'overflow:hidden;' : '');
    };
    return (
        <>
            {isEditting && (
                <div className="absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-sm backdrop-brightness-75 ">
                    <UpdateForms field={field} closeModal={handleInitialBtnClick.bind(null, false)} />
                </div>
            )}
            <button
                className={twMerge(
                    'w-fit rounded-sm border-[1px] border-blue-700 px-4 py-1 font-semibold text-blue-700 transition-[border-color,color] hover:border-transparent hover:bg-blue-700 hover:text-zinc-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-zinc-50',
                    className
                )}
                onClick={handleInitialBtnClick.bind(null, true)}
            >
                {text}
            </button>
        </>
    );
};

export default EditAccountButton;
