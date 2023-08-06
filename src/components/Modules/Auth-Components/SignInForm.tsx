"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import GlobalErrorMessage from "@/components/subComponents/form-parts/GlobalErrorMessage";
import TextInput from "@/components/subComponents/form-parts/TextInput";
interface SignInFormProps {}

const signInSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email"),
    password: z.string().trim().min(1, "Password is required"),
});
const SignInForm: FC<SignInFormProps> = () => {
    const [{ loading, submitted, globalError }, setFormState] = useState<{
        loading: boolean;
        submitted: boolean;
        globalError: string | null;
    }>({
        loading: false,
        submitted: false,
        globalError: "Test Error Message Here",
    });
    const {
        register,
        handleSubmit,
        resetField,
        setFocus,
        setError,
        formState: { errors, isSubmitSuccessful, dirtyFields },
    } = useForm({ resolver: zodResolver(signInSchema) });

    const onSubmit = (data: FieldValues) => {};

    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <div className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px]">
                    {globalError && (
                        <GlobalErrorMessage
                            error={globalError}
                            closeError={() => {
                                setFormState((curr) => ({ ...curr, globalError: null }));
                            }}
                        />
                    )}
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextInput
                                id="test"
                                label="test"
                                errors={errors.email}
                                isDirty={dirtyFields.email}
                                register={register}
                                resetField={resetField}
                            />
                        </form>
                    </div>
                </div>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default SignInForm;
