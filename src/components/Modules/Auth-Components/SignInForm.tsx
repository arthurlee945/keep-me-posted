"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import { BuiltInProviderType } from "next-auth/providers";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
//-----------------custom
import GlobalErrorMessage from "@/components/subComponents/form-parts/GlobalErrorMessage";
import GoogleIcon from "@/styles/icons/google.svg";
import TextInput from "@/components/subComponents/form-parts/TextInput";
import SubmitButton from "@/components/subComponents/form-parts/SubmitButton";
import { handleRecaptchaValidation } from "@/utils/utilFunctions";

interface SignInFormProps {
    csrfToken?: string;
    providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const signInSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email"),
    password: z.string().trim().min(1, "Password is required"),
});

const SignInForm: FC<SignInFormProps> = () => {
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
        setError,
        formState: { errors, isSubmitSuccessful, dirtyFields },
    } = useForm({ resolver: zodResolver(signInSchema) });

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
            const signInRes = await signIn("credentials", { email, password, redirect: false });
            if (!signInRes?.error) {
                router.push("/");
            } else {
                setFormState((curr) => ({
                    ...curr,
                    loading: false,
                    globalError: signInRes.error || "Couldn't Sign In",
                }));
            }
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
        resetField("email");
        resetField("password");
    }, [setFocus, resetField]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.div
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[375px] sm:min-w-0 sm:w-full"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h1 className="text-2xl font-semibold mb-3">Sign In</h1>
                    {globalError && (
                        <GlobalErrorMessage
                            error={globalError}
                            closeError={() => {
                                setFormState((curr) => ({ ...curr, globalError: null }));
                            }}
                        />
                    )}
                    <div className="relative flex flex-col text-sm align-center">
                        {loading && (
                            <div
                                className="z-10 flex justify-center items-center absolute w-[calc(100%+10px)] h-[calc(100%+10px)] top-[-5px] left-[-5px] 
                                    bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(255,255,255,0.3)] rounded-[5px]"
                                role="status"
                            >
                                <svg
                                    aria-hidden="false"
                                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-500 dark:fill-cyan-300"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <TextInput
                                id="email"
                                label="Email"
                                errors={errors.email}
                                isDirty={dirtyFields.email}
                                register={register}
                                resetField={resetField}
                            />
                            <TextInput
                                id="password"
                                label="Password"
                                type="password"
                                errors={errors.password}
                                isDirty={dirtyFields.password}
                                register={register}
                                resetField={resetField}
                            />
                            <SubmitButton disabled={loading}>Sign In With K.M.P.</SubmitButton>
                        </form>
                        <p
                            className="w-full my-4 text-xs flex justify-center items-center 
                        before:content-[''] before:flex-1 before:h-[1px] before:dark:bg-zinc-50 before:bg-zinc-900 before:mr-1
                        after:content-[''] after:flex-1 after:h-[1px] after:dark:bg-zinc-50 after:bg-zinc-900 after:ml-1"
                        >
                            OR
                        </p>
                        <SubmitButton
                            className="flex items-center justify-center gap-x-3"
                            type="button"
                            onClick={() => {
                                signIn("google");
                            }}
                            disabled={loading}
                        >
                            <GoogleIcon className="w-4 h-4" />
                            Sign In With Gmail
                        </SubmitButton>
                        <div className="mt-6">
                            <p className="text-sm">
                                New to <span className="font-semibold">Keep Me Posted</span>?{" "}
                                <Link className="font-semibold text-sky-600 hover:underline" href="/sign-up">
                                    Sign Up
                                </Link>
                            </p>
                            <Link className="text-sm font-semibold text-sky-600 hover:underline" href="/forgot-password">
                                Forgot Password
                            </Link>
                        </div>
                    </div>
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default SignInForm;
