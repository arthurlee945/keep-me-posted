"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/navigation";

//-----------------custom
import GlobalErrorMessage from "@/components/subComponents/form-parts/GlobalErrorMessage";
import TextInput from "@/components/subComponents/form-parts/TextInput";
import SubmitButton from "@/components/subComponents/form-parts/SubmitButton";
import { handleRecaptchaValidation } from "@/utils/functions/handleRecaptchaValidation";
import LoadingContainer from "@/components/subComponents/form-parts/LoadingContainer";
import CheckBoxInput from "@/components/subComponents/form-parts/CheckBoxInput";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";

const RegisterSchema = z
    .object({
        username: z.string().trim().min(1, "Username is required").max(100),
        email: z.string().trim().min(1, "Email is required").email("Invalid email"),
        password: z.string().trim().min(1, "Password is required").min(8, "Password must have more than 8 characters"),
        confirmPassword: z.string().trim().min(1, "Password confirmation is required"),
        terms: z.literal(true, {
            errorMap: () => ({ message: "You must accept the terms and conditions" }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });
export type RegisterFields = z.infer<typeof RegisterSchema>;
const RegisterForm = () => {
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
    } = useForm({ resolver: zodResolver(RegisterSchema) });

    const onSubmit = async ({ username, email, password }: FieldValues) => {
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
                "/api/auth/register",
                { name: username, email, password },
                { signal: AbortSignal.timeout(30000) }
            );

            const signInRes = await signIn("credentials", { email, password, redirect: false });
            if (!signInRes?.error) {
                router.push("/");
            } else {
                router.push("/auth/signin");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                setFormState((curr) => ({
                    ...curr,
                    loading: false,
                    globalError: ((err as AxiosError).response?.data as string) || "Sorry Something Went Wrong",
                }));
            } else {
                setFormState((curr) => ({
                    ...curr,
                    loading: false,
                    globalError: "Sorry Something Went Wrong",
                }));
            }
        }
    };
    useEffect(() => {
        setFocus("username");
    }, [setFocus]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.div
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[375px] w-[30%] sm:min-w-0 sm:w-full "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h1 className="text-2xl font-semibold mb-3">Register</h1>
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
                                id="username"
                                label="Username"
                                errors={errors.username}
                                isDirty={dirtyFields.username}
                                register={register}
                                resetField={resetField}
                            />
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
                            <TextInput
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                errors={errors.confirmPassword}
                                isDirty={dirtyFields.confirmPassword}
                                register={register}
                                resetField={resetField}
                            />
                            <CheckBoxInput id="terms" errors={errors.terms} legal={true} register={register} resetField={resetField} />
                            <SubmitButton disabled={loading}>Register</SubmitButton>
                        </form>
                        <div className="mt-6">
                            <p className="text-sm">
                                Already a <span className="font-semibold">Member</span>?{" "}
                                <Link className="font-semibold text-blue-500 hover:underline" href="/auth/signin">
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

export default RegisterForm;
