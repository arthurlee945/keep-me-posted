import { FC, SyntheticEvent } from 'react';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormResetField } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

interface TextInputProps {
    id: string;
    label: string;
    errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    isDirty: boolean;
    type?: 'text' | 'password' | 'email';
    register: UseFormRegister<FieldValues>;
    resetField: UseFormResetField<FieldValues>;
}

const TextInput: FC<TextInputProps> = ({ id, label, errors, isDirty, type = 'text', register, resetField }) => {
    const handleReset = (e: SyntheticEvent) => {
        if ((e.target as HTMLInputElement).value !== '') return;
        resetField(id, { defaultValue: '', keepDirty: false });
    };
    return (
        <div className="relative flex w-full flex-col justify-center gap-y-[2px]">
            <div className="relative flex w-full items-center">
                <input
                    className={`${isDirty ? 'is-dirty' : ''} ${
                        errors ? 'has-error' : ''
                    } peer w-full rounded-[5px] border-[1px] bg-transparent px-[15px] py-2 focus:outline-0 [&.has-error]:border-red-600`}
                    id={id}
                    type={type}
                    {...register(id, { onChange: handleReset })}
                />
                <label
                    className="absolute left-[15px] bg-zinc-50 text-base transition-[font-size,transform,background-color] peer-hover:-translate-y-full
                    peer-hover:text-sm peer-focus:-translate-y-full peer-focus:text-sm
                    peer-[.is-dirty]:-translate-y-full peer-[.is-dirty]:text-sm peer-[.has-error]:text-red-600 dark:bg-zinc-900"
                    htmlFor={id}
                >
                    {label}
                </label>
            </div>
            <FormErrorMessage errors={errors} />
        </div>
    );
};

export default TextInput;
