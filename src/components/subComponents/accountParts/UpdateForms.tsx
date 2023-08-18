'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { FC, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

//-----------------custom
import GlobalErrorMessage from '@/components/subComponents/form-parts/GlobalErrorMessage';
import LoadingContainer from '@/components/subComponents/form-parts/LoadingContainer';
import TextInput from '@/components/subComponents/form-parts/TextInput';
import { handleRecaptchaValidation } from '@/utils/functions/handleRecaptchaValidation';
import axios, { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';

const NameUpdateSchema = z.object({
    name: z.string().trim().min(1, 'Name is Required'),
});
const EmailUpdateSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
});
const PasswordUpdateSchema = z
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
interface UpdateFormsProps {
    field: 'name' | 'email' | 'password';
    closeModal: () => void;
}

const UpdateForms: FC<UpdateFormsProps> = ({ field, closeModal }) => {
    const { update } = useSession();
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
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(
            field === 'name'
                ? NameUpdateSchema
                : field === 'email'
                ? EmailUpdateSchema
                : PasswordUpdateSchema
        ),
    });

    const onSubmit = async (data: FieldValues) => {
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
            const res = await axios.put('/api/auth/update-account', data, {
                signal: AbortSignal.timeout(30000),
            });
            if (res.status === 200) {
                if (field === 'password') return signOut({ callbackUrl: '/' });
                else
                    await update(
                        field === 'name'
                            ? { name: data.name }
                            : field === 'email'
                            ? { email: data.email }
                            : undefined
                    );
                return closeModal();
            } else {
                setFormState((curr) => ({
                    ...curr,
                    loading: false,
                    globalError: "Sorry Couldn't Update Your Record",
                }));
            }
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
    const onError = async (data: any) => console.log(data);
    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                <m.section
                    className="flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[375px] w-[30%] mobile:min-w-0 mobile:w-10/12"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h1 className="text-center font-semibold text-lg">
                        {`Editing ${
                            field[0].toUpperCase() +
                            field.slice(1).toLowerCase()
                        }`}
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
                    <div className="relative flex flex-col text-sm align-center">
                        {loading && <LoadingContainer />}
                        <form
                            id="myAccount-update-form"
                            className="flex flex-col gap-y-4"
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <TextInput
                                id={field}
                                label={
                                    field[0].toUpperCase() +
                                    field.slice(1).toLowerCase()
                                }
                                type={field === 'password' ? field : undefined}
                                errors={errors[field]}
                                isDirty={dirtyFields[field]}
                                register={register}
                                resetField={resetField}
                            />
                            {field === 'password' && (
                                <TextInput
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    errors={errors.confirmPassword}
                                    isDirty={dirtyFields.confirmPassword}
                                    register={register}
                                    resetField={resetField}
                                />
                            )}

                            <div className="flex justify-center gap-x-8">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="py-2 px-4 border-[1px] rounded-md bg-blue-600 dark:hover:bg-blue-500 hover:bg-blue-700"
                                >
                                    Update
                                </button>
                                <button
                                    disabled={loading}
                                    type="button"
                                    className="py-2 px-4 border-[1px] rounded-md bg-red-600 dark:hover:bg-red-500 hover:bg-red-700"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </m.section>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default UpdateForms;
