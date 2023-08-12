"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
//-----------------custom
import GlobalErrorMessage from "@/components/subComponents/form-parts/GlobalErrorMessage";
import TextInput from "@/components/subComponents/form-parts/TextInput";
import SubmitButton from "@/components/subComponents/form-parts/SubmitButton";
import { handleRecaptchaValidation } from "@/utils/functions/handleRecaptchaValidation";
import LoadingContainer from "@/components/subComponents/form-parts/LoadingContainer";
import axios from "axios";

const ForgotPasswordSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email"),
});

const ForgotPasswordForm = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [{ loading, globalError }, setFormState] = useState<{
        loading: boolean;
        globalError: string | null;
    }>({
        loading: false,
        globalError: null,
    });
    const {
        register,
        handleSubmit,
        resetField,
        setFocus,
        formState: { errors, dirtyFields },
    } = useForm({ resolver: zodResolver(ForgotPasswordSchema) });

    const onSubmit = async ({ email, password }: FieldValues) => {
        setFormState((curr) => ({
            ...curr,
            loading: true,
            globalError: null,
        }));
        const recaptchaValidate = await handleRecaptchaValidation(executeRecaptcha);
        if (!recaptchaValidate || recaptchaValidate !== "successful") {
            setFormState((curr) => ({
                ...curr,
                loading: false,
                globalError: "ReCaptcha Failed",
            }));
            return;
        }
        try {
            const { data } = await axios.post("/api/auth/forgot-password", { email }, { signal: AbortSignal.timeout(30000) });
        } catch (err) {
            setFormState((curr) => ({
                ...curr,
                loading: false,
                globalError: "Sorry Something Went Wrong",
            }));
        }
    };
    useEffect(() => {
        setFocus("email");
    }, [setFocus]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.div
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[375px] w-[30%] sm:min-w-0 sm:w-full "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h1 className="text-2xl font-semibold mb-3">Forgot Password</h1>
                    {globalError && (
                        <GlobalErrorMessage
                            error={globalError}
                            closeError={() => {
                                setFormState((curr) => ({ ...curr, globalError: null }));
                            }}
                        />
                    )}
                    <div className="relative flex flex-col text-sm align-center">
                        {loading && <LoadingContainer />}
                        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <TextInput
                                id="email"
                                label="Email"
                                errors={errors.email}
                                isDirty={dirtyFields.email}
                                register={register}
                                resetField={resetField}
                            />
                            <SubmitButton disabled={loading}>Reset Password</SubmitButton>
                        </form>
                        <div className="mt-6">
                            <p className="text-sm">
                                New to <span className="font-semibold">Keep Me Posted</span>?{" "}
                                <Link className="font-semibold text-sky-600 hover:underline" href="/auth/register">
                                    Sign Up
                                </Link>
                            </p>
                            <p className="text-sm">
                                Remembered Your <span className="font-semibold">Credential</span>?{" "}
                                <Link className="font-semibold text-sky-600 hover:underline" href="/auth/signin">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default ForgotPasswordForm;
