import Link from "next/link";
import { FC } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormResetField } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";

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
            <div className="flex group">
                <input
                    id={id}
                    className={`${
                        errors ? "has-error" : ""
                    } appearance-none relative mr-[15px] w-[20px] h-[20px] aspect-square border-[1px] cursor-pointer 
                    after:content-darkCheckmark after:dark:content-lightCheckmark after:w-full after:h-full after:absolute after:top-0 after:left-0 after:transition-[clip-path]
                    after:[clip-path:polygon(0%0%,0%0%,0%100%,0%100%)] hover:[&:not(input:checked)]:[&not(.has-error)]:border-zinc-400 
                    checked:after:[clip-path:polygon(0%0%,100%0%,100%100%,0%100%)] [&.has-error]:border-red-600 hover:[&.has-error]:border-red-500`}
                    type="checkbox"
                    {...register(id)}
                />
                <label className={`${errors ? "has-error" : ""} cursor-pointer [&.has-error]:text-red-600 group`} htmlFor={id}>
                    {legal ? (
                        <>
                            By continuing, you are setting up an account with this app and agree to our{" "}
                            <Link
                                className="text-blue-500 hover:underline font-semibold group-[.has-error]:text-red-500"
                                href="/"
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
