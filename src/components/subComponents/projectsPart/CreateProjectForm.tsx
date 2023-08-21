'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
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
import { handleRecaptchaValidation } from '@/utils/functions/handleRecaptchaValidation';
import axios, { AxiosError } from 'axios';
import FileInput from '../form-parts/FileInput';

const CreateProjectSchema = z.object({
    title: z.string().trim().min(1, 'title is required').max(100),
    packageJson: z
        .any()
        .refine((file) => file && file.length > 0, 'package.json is requried')
        .refine((file) => file && file.length > 0 && file[0].type === 'application/json', 'Only .json formats are supported')
        .refine((file) => file && file.length > 0 && file[0]?.size < 1000000, 'Max file size is 1mb'),
});

export type CreateProjectFields = z.infer<typeof CreateProjectSchema>;
const CreateProjectForm = () => {
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
    } = useForm({ resolver: zodResolver(CreateProjectSchema) });

    const onSubmit = async ({ title, packageJson }: FieldValues) => {
        const packageJsonUrl = URL.createObjectURL(packageJson[0]);
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
            const res = await axios.post('/api/project/create', { title, packageJsonUrl }, { signal: AbortSignal.timeout(30000) });
            console.log(res);
            router.push('/projects');
        } catch (err) {
            console.log(err);
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
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[375px] w-[30%] mobile:min-w-0 mobile:w-full "
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h1 className="text-3xl font-semibold">Create A Project</h1>
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
                                id="title"
                                label="Title"
                                errors={errors.title}
                                isDirty={dirtyFields.title}
                                register={register}
                                resetField={resetField}
                            />
                            <FileInput
                                id="packageJson"
                                errors={errors.packageJson}
                                isDirty={dirtyFields.packageJson}
                                register={register}
                                resetField={resetField}
                            />
                            <SubmitButton disabled={loading}>Create</SubmitButton>
                        </form>
                    </div>
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default CreateProjectForm;
