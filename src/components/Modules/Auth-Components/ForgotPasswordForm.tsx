'use client';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
//-----------------custom
import GlobalErrorMessage from '@/components/subComponents/form-parts/GlobalErrorMessage';
import TextInput from '@/components/subComponents/form-parts/TextInput';
import SubmitButton from '@/components/subComponents/form-parts/SubmitButton';
import { handleRecaptchaValidation } from '@/utils/functions/handleRecaptchaValidation';
import LoadingContainer from '@/components/subComponents/form-parts/LoadingContainer';
import axios, { AxiosError } from 'axios';

const ForgotPasswordSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
});

const ForgotPasswordForm = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [{ loading, submitted, globalError }, setFormState] = useState<{
        loading: boolean;
        submitted: boolean;
        globalError: string | null;
    }>({
        loading: false,
        submitted: false,
        globalError: null,
    });
    const {
        register,
        handleSubmit,
        resetField,
        setFocus,
        formState: { errors, dirtyFields },
    } = useForm({ resolver: zodResolver(ForgotPasswordSchema) });

    const onSubmit = async ({ email }: FieldValues) => {
        setFormState((curr) => ({
            ...curr,
            loading: true,
            globalError: null,
        }));
        const recaptchaValidate = await handleRecaptchaValidation(executeRecaptcha);
        if (!recaptchaValidate || recaptchaValidate !== 'successful') {
            setFormState((curr) => ({
                ...curr,
                loading: false,
                globalError: 'ReCaptcha Failed',
            }));
            return;
        }
        try {
            await axios.post('/api/auth/forgot-password', { email }, { signal: AbortSignal.timeout(30000) });
            setFormState((curr) => ({
                ...curr,
                loading: false,
                submitted: true,
            }));
        } catch (err) {
            if (err instanceof AxiosError) {
                setFormState((curr) => ({
                    ...curr,
                    loading: false,
                    globalError: `${(err as AxiosError).response?.data}` || 'Sorry Something Went Wrong',
                }));
            } else {
                setFormState((curr) => ({
                    ...curr,
                    loading: false,
                    globalError: 'Sorry Something Went Wrong',
                }));
            }
        }
    };
    useEffect(() => {
        setFocus('email');
    }, [setFocus]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.section
                    className="flex w-[30%] min-w-[375px] flex-col gap-y-[15px] rounded-[5px] border-[1px] p-4 mobile:w-full mobile:min-w-0 "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {!submitted && (
                        <>
                            <h1 className="mb-3 text-2xl font-semibold">Forgot Password</h1>
                            {globalError && (
                                <GlobalErrorMessage
                                    error={globalError}
                                    closeError={() => {
                                        setFormState((curr) => ({
                                            ...curr,
                                            globalError: null,
                                        }));
                                    }}
                                />
                            )}
                        </>
                    )}
                    <div className="align-center relative flex flex-col text-sm">
                        {!submitted ? (
                            <>
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
                                        New to <span className="font-semibold">Keep Me Posted</span>?{' '}
                                        <Link className="font-semibold text-sky-600 hover:underline" href="/auth/register">
                                            Sign Up
                                        </Link>
                                    </p>
                                    <p className="text-sm">
                                        Remembered Your <span className="font-semibold">Credential</span>?{' '}
                                        <Link className="font-semibold text-sky-600 hover:underline" href="/auth/signin">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="mb-6 text-center text-lg">
                                    <span className="line font-bold">Email is sent!</span>
                                    <br />
                                    <span className="text-sm">Please follow instruction to reset your password!</span>
                                </h1>
                                <Link
                                    className="w-fit self-center rounded-[5px] border-[1px] px-5 py-2 font-semibold transition-[letter-spacing] hover:tracking-wider"
                                    href="/"
                                >
                                    Go Back
                                </Link>
                            </>
                        )}
                    </div>
                </m.section>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default ForgotPasswordForm;
