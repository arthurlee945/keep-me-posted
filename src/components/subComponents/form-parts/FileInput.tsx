import { ChangeEvent, FC } from 'react';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormResetField } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

interface FileInputProps {
    id: string;
    errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    isDirty: boolean;
    register: UseFormRegister<FieldValues>;
    resetField: UseFormResetField<FieldValues>;
}

const FileInput: FC<FileInputProps> = ({ id, errors, isDirty, register, resetField }) => {
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) return;
        resetField(id, { defaultValue: undefined, keepDirty: false });
    };
    return (
        <div className="relative flex flex-col justify-center w-full gap-y-[2px]">
            <div className="flex items-center relative w-full flex-col">
                <input
                    type="file"
                    className={`${isDirty ? 'is-dirty' : ''} ${errors ? 'has-error' : ''} 
                    relative cursor-pointer m-0 block w-full min-w-0 flex-auto rounded border bg-clip-padding px-3 py-[0.32rem] text-base font-normal file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:cursor-pointer file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-zinc-700 focus:shadow-te-primary focus:outline-none dark:file:bg-zinc-800 dark:file:text-neutral-100 dark:focus:border-primary  [&.has-error]:border-red-600 [&.has-error]:text-red-600 [&.is-dirty]:[&:not(.has-error)]:border-blue-600 [&.is-dirty]:[&:not(.has-error)]:text-blue-600`}
                    accept="application/json"
                    id={id}
                    {...register(id, {
                        required: true,
                        onChange: handleFileInputChange,
                    })}
                />
            </div>
            <FormErrorMessage errors={errors} />
        </div>
    );
};

export default FileInput;
