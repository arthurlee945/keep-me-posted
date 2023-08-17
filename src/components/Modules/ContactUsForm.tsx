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

interface ContactUsFormProps {}

const ContactUsSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
    message: z.string().trim(),
});

const ContactUsForm: FC<ContactUsFormProps> = () => {
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
    } = useForm({ resolver: zodResolver(ContactUsSchema) });

    const onSubmit = async ({ name, email, message }: FieldValues) => {
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
            await axios.post(
                '/api/contact-route',
                { name, email, message, type: 'contact' },
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
        setFocus('name');
    }, [setFocus]);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.div
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[400px] w-[40%] mobile:min-w-0 mobile:w-full "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {!submitted && (
                        <>
                            <h1 className="text-3xl font-semibold mb-3 text-center">
                                Contact Us
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
                                    <SubmitButton disabled={loading}>
                                        Send Message
                                    </SubmitButton>
                                </form>
                            </>
                        ) : (
                            <>
                                <h1 className="font-bold text-xl mb-2 text-center">
                                    Your Request is Sent!
                                </h1>
                                <p className="text-base text-center">
                                    We will get back to you shortly
                                </p>
                                <Link
                                    className="border-[1px] py-2 px-4 rounded-[5px] transition-[letter-spacing] hover:tracking-wider font-semibold self-center mt-5"
                                    href="/"
                                >
                                    Home
                                </Link>
                            </>
                        )}
                    </div>
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default ContactUsForm;
