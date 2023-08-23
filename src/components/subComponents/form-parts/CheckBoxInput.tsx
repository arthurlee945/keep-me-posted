import Link from 'next/link';
import { FC } from 'react';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormResetField } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

interface CheckBoxInputProps {
    id: string;
    label?: string;
    legal?: boolean;
    errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    register: UseFormRegister<FieldValues>;
    resetField: UseFormResetField<FieldValues>;
}

const CheckBoxInput: FC<CheckBoxInputProps> = ({ id, label, legal = false, errors, register }) => {
    return (
        <div className="relative flex flex-col">
            <div className="group flex">
                <input
                    id={id}
                    className={`${
                        errors ? 'has-error' : ''
                    } relative mr-[15px] aspect-square h-[20px] w-[20px] cursor-pointer appearance-none border-[1px] 
                    after:absolute after:left-0 after:top-0 after:h-full after:w-full after:transition-[clip-path] after:content-darkCheckmark after:[clip-path:polygon(0%0%,0%0%,0%100%,0%100%)]
                    checked:after:[clip-path:polygon(0%0%,100%0%,100%100%,0%100%)] after:dark:content-lightCheckmark 
                    [&.has-error]:border-red-600 hover:[&.has-error]:border-red-500 hover:[&:not(input:checked)]:[&not(.has-error)]:border-zinc-400`}
                    type="checkbox"
                    {...register(id)}
                />
                <label className={`${errors ? 'has-error' : ''} group cursor-pointer [&.has-error]:text-red-600`} htmlFor={id}>
                    {legal ? (
                        <>
                            By continuing, you are setting up an account with this app and agree to our{' '}
                            <Link
                                className="font-semibold text-blue-500 hover:underline group-[.has-error]:text-red-500"
                                href="/terms-and-conditions"
                                target="_blank"
                            >
                                Terms of Use
                            </Link>
                            .
                        </>
                    ) : (
                        label
                    )}
                </label>
            </div>
            <FormErrorMessage errors={errors} />
        </div>
    );
};

export default CheckBoxInput;
