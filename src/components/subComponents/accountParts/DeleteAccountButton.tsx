'use client';
import axios, { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import { FC, useState } from 'react';
import LoadingContainer from '../form-parts/LoadingContainer';

interface DeleteAccountButtonProps {}

const DeleteAccountButton: FC<DeleteAccountButtonProps> = () => {
    const [btnState, setBtnState] = useState(false);
    const [{ loading, error }, setDeleteStatus] = useState<{
        loading: boolean;
        error: string | null;
    }>({
        loading: false,
        error: null,
    });
    const handleDeleteConfirmClick = async () => {
        setDeleteStatus((curr) => ({ ...curr, loading: true }));
        try {
            await axios.post('/api/auth/delete-account');
            signOut({ callbackUrl: '/' });
        } catch (err) {
            if (err instanceof AxiosError) {
                setDeleteStatus((curr) => ({
                    ...curr,
                    loading: false,
                    error: `${(err as AxiosError).response?.data}` || "Couldn't Process Your Request!",
                }));
                return;
            }
            setDeleteStatus((curr) => ({
                ...curr,
                loading: false,
                error: `${(err as AxiosError).response?.data}` || "Couldn't Process Your Request!",
            }));
        }
    };
    const handleInitialBtnClick = (open: boolean) => {
        setBtnState(open);
        document.body.setAttribute('style', open ? 'overflow:hidden;' : '');
        if (error && !open) setDeleteStatus((curr) => ({ ...curr, error: null }));
    };
    return (
        <>
            {btnState && (
                <div className="absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-sm backdrop-brightness-75">
                    <section className="relative flex w-[30%] min-w-[350px] flex-col gap-y-[15px] rounded-[5px] border-[1px] p-4 mobile:w-10/12 mobile:min-w-0">
                        {loading && <LoadingContainer />}
                        {error ? (
                            <>
                                <h1 className="max-h-1/2 text-ellipsis text-center text-lg font-semibold">{error}</h1>
                                <button
                                    disabled={loading}
                                    className="self-center rounded-md border-[1px] bg-red-600  px-4 py-2 hover:bg-red-700 dark:hover:bg-red-500"
                                    onClick={handleInitialBtnClick.bind(null, false)}
                                >
                                    Close
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-center text-lg font-semibold">
                                    You are about to <span className="font-bold text-red-600">Delete</span> your account. <br />
                                    Are you Sure?
                                </h1>
                                <div className="flex justify-center gap-x-8">
                                    <button
                                        disabled={loading}
                                        className="rounded-md border-[1px] bg-red-600 px-4 py-2 hover:bg-red-700 dark:hover:bg-red-500"
                                        onClick={handleDeleteConfirmClick}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        disabled={loading}
                                        className="rounded-md border-[1px] bg-green-600 px-4 py-2 hover:bg-green-700 dark:hover:bg-green-500"
                                        onClick={handleInitialBtnClick.bind(null, false)}
                                    >
                                        No
                                    </button>
                                </div>
                            </>
                        )}
                    </section>
                </div>
            )}
            <button
                className={
                    'w-fit self-end rounded-lg border-[1px] border-red-600 bg-transparent px-8 py-2 font-semibold text-red-600 transition-[border-color,background-color,color] hover:border-transparent hover:bg-red-600 hover:text-zinc-50 mobile:px-4'
                }
                onClick={handleInitialBtnClick.bind(null, true)}
            >
                Delete Account
            </button>
        </>
    );
};

export default DeleteAccountButton;
