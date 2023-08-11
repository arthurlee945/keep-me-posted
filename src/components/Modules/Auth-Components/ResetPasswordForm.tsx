"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";

import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
//-----------------custom
import GlobalErrorMessage from "@/components/subComponents/form-parts/GlobalErrorMessage";
import GoogleIcon from "@/styles/icons/google.svg";
import TextInput from "@/components/subComponents/form-parts/TextInput";
import SubmitButton from "@/components/subComponents/form-parts/SubmitButton";
import { handleRecaptchaValidation } from "@/utils/functions/handleRecaptchaValidation";
import LoadingContainer from "@/components/subComponents/form-parts/LoadingContainer";
import axios from "axios";

interface ResetPasswordFormProps {
    token: string | undefined;
}

const ResetPasswordSchema = z
    .object({
        password: z.string().trim().min(1, "Password is required").min(8, "Password must have more than 8 characters"),
        confirmPassword: z.string().trim().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password !== data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
    const router = useRouter();
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
    } = useForm({ resolver: zodResolver(ResetPasswordSchema) });

    const onSubmit = async ({ password }: FieldValues) => {
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
            const { data } = await axios.post(
                "/api/auth/reset-password/reset",
                { token, password },
                { signal: AbortSignal.timeout(30000) }
            );
            //*Makes sure when password change log people out
            // const signInRes = await signIn("credentials", { email, password, redirect: false });
            // if (!signInRes?.error) {
            //     router.push("/");
            // } else {
            //     setFormState((curr) => ({
            //         ...curr,
            //         loading: false,
            //         globalError: signInRes.error || "Couldn't Sign In",
            //     }));
            // }
        } catch (err) {
            setFormState((curr) => ({
                ...curr,
                loading: false,
                globalError: "Sorry Something Went Wrong",
            }));
        }
    };
    useEffect(() => {
        setFocus("password");
    }, [setFocus]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.div
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[375px] w-[30%] sm:min-w-0 sm:w-full "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h1 className="text-2xl font-semibold mb-3">Reset Password</h1>
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
                                id="password"
                                label="Password"
                                type="password"
                                errors={errors.password}
                                isDirty={dirtyFields.password}
                                register={register}
                                resetField={resetField}
                            />
                            <TextInput
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                errors={errors.confirmPassword}
                                isDirty={dirtyFields.confirmPassword}
                                register={register}
                                resetField={resetField}
                            />
                            <SubmitButton disabled={loading}>Reset Password</SubmitButton>
                        </form>

                        <div className="mt-6">
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

export default ResetPasswordForm;
