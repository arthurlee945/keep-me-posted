import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
interface SubmitButtonProps {
    children: ReactNode;
    className?: string;
    type?: 'submit' | 'button' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ className, type = 'submit', children = 'Placeholder', disabled = true, onClick }) => {
    return (
        <button
            className={twMerge(
                'rounded-[5px] bg-zinc-900 px-[10px] py-[8px] font-semibold text-zinc-50 transition-[background-color,_letter-spacing] hover:bg-zinc-700 hover:tracking-wide disabled:cursor-not-allowed disabled:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 hover:dark:bg-zinc-300 disabled:dark:bg-zinc-200',
                className
            )}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default SubmitButton;
