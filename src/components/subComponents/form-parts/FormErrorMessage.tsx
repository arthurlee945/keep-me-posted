import { AnimatePresence, m } from 'framer-motion';
import { FC } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface FormErrorMessageProps {
    errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({ errors }) => {
    return (
        <div>
            <AnimatePresence>
                {errors && errors.message && (
                    <m.p
                        className="text-xs text-red-600"
                        initial={{ y: '-100%', height: 0, opacity: 0 }}
                        animate={{ y: 0, height: 'auto', opacity: 1 }}
                        exit={{ y: '-100%', height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {errors.message as string}
                    </m.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FormErrorMessage;
