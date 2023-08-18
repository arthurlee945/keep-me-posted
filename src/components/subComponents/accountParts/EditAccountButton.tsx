'use client';
import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import UpdateForms from './UpdateForms';

interface EditAccountButtonProps {
    field: 'name' | 'email' | 'password';
    text?: string;
    className?: string;
}

const EditAccountButton: FC<EditAccountButtonProps> = ({
    field,
    text = 'Edit',
    className,
}) => {
    const [isEditting, setEditStatus] = useState<boolean>(false);
    const handleInitialBtnClick = (open: boolean) => {
        setEditStatus(open);
        document.body.setAttribute('style', open ? 'overflow:hidden;' : '');
    };
    return (
        <>
            {isEditting && (
                <div className="z-20 absolute top-0 left-0 flex justify-center items-center w-screen h-screen backdrop-brightness-75 backdrop-blur-sm">
                    <UpdateForms
                        field={field}
                        closeModal={handleInitialBtnClick.bind(null, false)}
                    />
                </div>
            )}
            <button
                className={twMerge(
                    'py-1 px-4 border-[1px] font-semibold rounded-sm w-fit transition-[border-color,color] dark:border-blue-400 dark:text-blue-400 border-blue-700 text-blue-700 hover:border-transparent dark:hover:bg-blue-400 hover:bg-blue-700 dark:hover:text-zinc-50 hover:text-zinc-50',
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
