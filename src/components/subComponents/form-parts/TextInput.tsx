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
            <div className="relative w-full">
                <input id={id} type={type} {...register(id, { onChange: handleReset })} />
                <label htmlFor={id}>Test</label>
            </div>
            <FormErrorMessage errors={errors} />
        </div>
    );
};

export default TextInput;
