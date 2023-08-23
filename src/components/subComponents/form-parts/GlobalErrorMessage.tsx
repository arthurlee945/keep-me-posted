import { m } from 'framer-motion';
import { FC } from 'react';
import CloseIcon from '@/styles/icons/Close.svg';
interface GlobalErrorMessageProps {
    error: string;
    closeError: () => void;
}

const GlobalErrorMessage: FC<GlobalErrorMessageProps> = ({ error, closeError }) => {
    return (
        <m.div
            className="flex items-center justify-between gap-x-6 rounded-[5px] border-[1px] border-red-600 p-2"
            initial={{ x: 15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
        >
            <p className="text-sm  text-red-600">{error}</p>
            <button className="h-6 w-6" onClick={closeError}>
                <CloseIcon className="fill-red-600" />
            </button>
        </m.div>
    );
};

export default GlobalErrorMessage;
