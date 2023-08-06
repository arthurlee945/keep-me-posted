import { m } from "framer-motion";
import { FC } from "react";
import CloseIcon from "@/styles/icons/Close.svg";
interface GlobalErrorMessageProps {
    error: string;
    closeError: () => void;
}

const GlobalErrorMessage: FC<GlobalErrorMessageProps> = ({ error, closeError }) => {
    return (
        <m.div
            className="flex items-center justify-between p-2 border-[1px] gap-x-6 border-red-500 dark:border-red-700 rounded-[5px]"
            initial={{ x: 15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
        >
            <p className="text-red-500 dark:text-red-700 text-sm">{error}</p>
            <button className="w-4 h-4" onClick={closeError}>
                <CloseIcon className="fill-red-500 dark:fill-red-700" />
            </button>
        </m.div>
    );
};

export default GlobalErrorMessage;
