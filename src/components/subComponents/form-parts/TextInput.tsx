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
                    className="bg-transparent w-full border-[1px] rounded-[5px]"
                    id={id}
                    type={type}
                    {...register(id, { onChange: handleReset })}
                />
                <label className="absolute left-[10px]" htmlFor={id}>
                    Test
                </label>
            </div>
            <FormErrorMessage errors={errors} />
        </div>
    );
};

export default TextInput;
