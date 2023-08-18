'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
//-----------------custom
import GlobalErrorMessage from '@/components/subComponents/form-parts/GlobalErrorMessage';
import LoadingContainer from '@/components/subComponents/form-parts/LoadingContainer';
import SubmitButton from '@/components/subComponents/form-parts/SubmitButton';
import TextInput from '@/components/subComponents/form-parts/TextInput';
import { handleRecaptchaValidation } from '@/utils/functions/handleRecaptchaValidation';
import axios, { AxiosError } from 'axios';

interface ResetPasswordFormProps {
    token: string | undefined;
}

const ResetPasswordSchema = z
    .object({
        password: z
            .string()
            .trim()
            .min(1, 'Password is required')
            .min(8, 'Password must have more than 8 characters'),
        confirmPassword: z
            .string()
            .trim()
            .min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
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
    } = useForm({ resolver: zodResolver(ResetPasswordSchema) });

    const onSubmit = async ({ password }: FieldValues) => {
        setFormState((curr) => ({
            ...curr,
            loading: true,
            globalError: null,
        }));
        const recaptchaValidate =
            await handleRecaptchaValidation(executeRecaptcha);
        if (!recaptchaValidate || recaptchaValidate !== 'successful') {
            setFormState((curr) => ({
                ...curr,
                loading: false,
                globalError: 'ReCaptcha Failed',
            }));
            return;
        }
        try {
            await axios.put(
                '/api/auth/reset-password',
                { token, password },
                { signal: AbortSignal.timeout(30000) }
            );
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
                    globalError:
                        `${(err as AxiosError).response?.data}` ||
                        'Sorry Something Went Wrong',
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
        setFocus('password');
    }, [setFocus]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.div
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[375px] w-[30%] mobile:min-w-0 mobile:w-full "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {!submitted && (
                        <>
                            <h1 className="text-2xl font-semibold mb-3">
                                New Password
                            </h1>
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
                    <div className="relative flex flex-col text-sm align-center">
                        {!submitted ? (
                            <>
                                {loading && <LoadingContainer />}
                                <form
                                    className="flex flex-col gap-y-4"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
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
                                    <SubmitButton disabled={loading}>
                                        Reset Password
                                    </SubmitButton>
                                </form>

                                <div className="mt-6">
                                    <p className="text-sm">
                                        Remembered Your{' '}
                                        <span className="font-semibold">
                                            Credential
                                        </span>
                                        ?{' '}
                                        <Link
                                            className="font-semibold text-sky-600 hover:underline"
                                            href="/auth/signin"
                                        >
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="text-lg text-center mb-6">
                                    <span className="font-bold line">
                                        Password reset successful!
                                    </span>
                                    <br />
                                    <span className="text-sm">
                                        Please sign back in with your new
                                        password!
                                    </span>
                                </h1>
                                <Link
                                    className="border-[1px] py-2 px-5 rounded-[5px] transition-[letter-spacing] hover:tracking-wider font-semibold w-fit self-center"
                                    href="/auth/signin"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default ResetPasswordForm;
