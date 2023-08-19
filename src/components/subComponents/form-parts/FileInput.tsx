import { FC, SyntheticEvent } from 'react';
import {
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    UseFormRegister,
    UseFormResetField,
} from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

interface FileInputProps {
    id: string;
    errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    isDirty: boolean;
    register: UseFormRegister<FieldValues>;
    resetField: UseFormResetField<FieldValues>;
}

const FileInput: FC<FileInputProps> = ({
    id,
    errors,
    isDirty,
    register,
    resetField,
}) => {
    const handleReset = (e: SyntheticEvent) => {
        if (!(e.target as HTMLInputElement).files) return;
        resetField(id, { defaultValue: '', keepDirty: false });
    };
    return (
        <div className="relative flex flex-col justify-center w-full gap-y-[2px]">
            <div className="flex items-center relative w-full">
                <label
                    htmlFor={id}
                    className={`${isDirty ? 'is-dirty' : ''} ${
                        errors ? 'has-error' : ''
                    } aspect-[1/0.4] border-[1px] rounded-[5px] p-4 w-full cursor-pointer flex justify-center items-center font-semibold transition-color dark:hover:bg-[rgb(255,255,255,0.05)]  hover:bg-[rgba(0,0,0,0.05)] [&.has-error]:border-red-600 [&.has-error]:text-red-600`}
                >
                    Browse File
                </label>
                <input
                    type="file"
                    className="hidden"
                    id={id}
                    {...register(id, { required: true, onChange: handleReset })}
                />
            </div>
            <FormErrorMessage errors={errors} />
        </div>
    );
};

export default FileInput;
