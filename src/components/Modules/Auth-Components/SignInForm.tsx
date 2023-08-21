'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
//-----------------custom
import GlobalErrorMessage from '@/components/subComponents/form-parts/GlobalErrorMessage';
import LoadingContainer from '@/components/subComponents/form-parts/LoadingContainer';
import SubmitButton from '@/components/subComponents/form-parts/SubmitButton';
import TextInput from '@/components/subComponents/form-parts/TextInput';
import GoogleIcon from '@/styles/icons/google.svg';
import { handleRecaptchaValidation } from '@/utils/functions/handleRecaptchaValidation';

const signInSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
    password: z.string().trim().min(1, 'Password is required'),
});

const SignInForm = () => {
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
    } = useForm({ resolver: zodResolver(signInSchema) });

    const onSubmit = async ({ email, password }: FieldValues) => {
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
            const signInRes = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (!signInRes?.error) {
                router.push('/projects');
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
                globalError: 'Sorry Something Went Wrong',
            }));
        }
    };
    useEffect(() => {
        setFocus('email');
        resetField('email');
        resetField('password');
    }, [setFocus, resetField]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.div
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[375px] w-[30%] mobile:min-w-0 mobile:w-full "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h1 className="text-2xl font-semibold mb-3">Sign In</h1>
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
                                signIn('google', { callbackUrl: '/projects' });
                            }}
                            disabled={loading}
                        >
                            <GoogleIcon className="w-4 h-4" />
                            Sign In With Gmail
                        </SubmitButton>
                        <div className="mt-6">
                            <p className="text-sm">
                                New to <span className="font-semibold">Keep Me Posted</span>?{' '}
                                <Link className="font-semibold text-sky-600 hover:underline" href="/auth/register">
                                    Sign Up
                                </Link>
                            </p>
                            <Link className="text-sm font-semibold text-sky-600 hover:underline" href="/auth/forgot-password">
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
