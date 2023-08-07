import { FC, SyntheticEvent } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormResetField } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";

interface TextInputProps {
    id: string;
    label: string;
    errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    isDirty: boolean;
    type?: "text" | "password" | "email";
    register: UseFormRegister<FieldValues>;
    resetField: UseFormResetField<FieldValues>;
}

const TextInput: FC<TextInputProps> = ({ id, label, errors, isDirty, type = "text", register, resetField }) => {
    const handleReset = (e: SyntheticEvent) => {
        if ((e.target as HTMLInputElement).value !== "") return;
        resetField(id, { defaultValue: "", keepDirty: false });
    };
    return (
        <div className="relative flex flex-col justify-center w-full">
            <div className="flex items-center relative w-full">
                <input
                    className={`${isDirty ? "is-dirty" : ""} ${
                        !!errors || true ? "has-error" : ""
                    } bg-transparent w-full border-[1px] rounded-[5px] px-[15px] py-[10px] focus:outline-0 peer`}
                    id={id}
                    type={type}
                    {...register(id, { onChange: handleReset })}
                />
                <label
                    className="absolute left-[15px] transition-[font-size,transform,background-color] dark:bg-zinc-900 bg-zinc-50
                    peer-hover:translate-y-[calc(-100%-2.5px)] peer-focus:translate-y-[calc(-100%-2.5px)] peer-[.is-dirty]:translate-y-[calc(-100%-2.5px)]
                    peer-hover:text-sm peer-focus:text-sm peer-[.is-dirty]:text-sm peer-[.has-error]:text-red-500 peer-[.has-error]:dark:text-red-700"
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
