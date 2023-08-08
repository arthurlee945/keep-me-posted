import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
interface SubmitButtonProps {
    children: ReactNode;
    className?: string;
    type?: "submit" | "button" | "reset";
    onClick?: () => void;
    disabled?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ className, type = "submit", children = "Placeholder", disabled = true, onClick }) => {
    return (
        <button
            className={twMerge(
                "bg-zinc-900 dark:bg-zinc-50 font-semibold text-zinc-50 dark:text-zinc-900 py-[8px] px-[10px] rounded-[5px] transition-[background-color,_letter-spacing] hover:dark:bg-zinc-300 hover:bg-zinc-700 hover:tracking-wide disabled:dark:bg-zinc-200 disabled:bg-zinc-800 disabled:cursor-not-allowed",
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
