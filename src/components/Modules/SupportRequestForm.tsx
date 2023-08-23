'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
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
import TextArea from '../subComponents/form-parts/TextArea';
import Link from 'next/link';

interface SupportRequestFormProps {}

const SupportRequestSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
    message: z.string().trim(),
});

const SupportRequestForm: FC<SupportRequestFormProps> = () => {
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
    } = useForm({ resolver: zodResolver(SupportRequestSchema) });

    const onSubmit = async ({ name, email, message }: FieldValues) => {
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
            await axios.post('/api/contact-route', { name, email, message, type: 'support' }, { signal: AbortSignal.timeout(30000) });
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
        setFocus('name');
    }, [setFocus]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.div
                    className="flex w-[40%] min-w-[400px] flex-col gap-y-[15px] rounded-[5px] border-[1px] p-4 mobile:w-full mobile:min-w-0 "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {!submitted && (
                        <>
                            <h1 className="mb-3 text-center text-3xl font-semibold">Support Request</h1>
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
                                        id="name"
                                        label="Name"
                                        errors={errors.name}
                                        isDirty={dirtyFields.name}
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
                                    <TextArea
                                        id="message"
                                        label="Message"
                                        errors={errors.message}
                                        isDirty={dirtyFields.message}
                                        register={register}
                                        resetField={resetField}
                                    />
                                    <SubmitButton disabled={loading}>Send Message</SubmitButton>
                                </form>
                                <div className="mt-6">
                                    <p className="text-sm">
                                        Want to submit issue on <span className="font-semibold">Github</span>?{' '}
                                        <Link
                                            className="font-semibold text-blue-500 hover:underline"
                                            href="https://github.com/arthurlee945/keep-me-posted"
                                            target="_blank"
                                        >
                                            Issue Submit
                                        </Link>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="mb-2 text-center text-xl font-bold">Your Support Request is Sent!</h1>
                                <p className="text-center text-base">We will get back to you shortly</p>
                                <Link
                                    className="mt-5 self-center rounded-[5px] border-[1px] px-4 py-2 font-semibold transition-[letter-spacing] hover:tracking-wider"
                                    href="/projects"
                                >
                                    Back to Project
                                </Link>
                            </>
                        )}
                    </div>
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default SupportRequestForm;
