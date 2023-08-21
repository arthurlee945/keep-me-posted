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
                <div className="z-20 absolute top-0 left-0 flex justify-center items-center w-screen h-screen backdrop-brightness-75 backdrop-blur-sm">
                    <section className="relative flex flex-col border-[1px] p-4 gap-y-[15px] rounded-[5px] min-w-[350px] w-[30%] mobile:min-w-0 mobile:w-10/12">
                        {loading && <LoadingContainer />}
                        {error ? (
                            <>
                                <h1 className="text-center font-semibold text-lg text-ellipsis max-h-1/2">{error}</h1>
                                <button
                                    disabled={loading}
                                    className="py-2 px-4 border-[1px] rounded-md  bg-red-600 dark:hover:bg-red-500 hover:bg-red-700 self-center"
                                    onClick={handleInitialBtnClick.bind(null, false)}
                                >
                                    Close
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-center font-semibold text-lg">
                                    You are about to <span className="text-red-600 font-bold">Delete</span> your account. <br />
                                    Are you Sure?
                                </h1>
                                <div className="flex justify-center gap-x-8">
                                    <button
                                        disabled={loading}
                                        className="py-2 px-4 border-[1px] rounded-md bg-red-600 dark:hover:bg-red-500 hover:bg-red-700"
                                        onClick={handleDeleteConfirmClick}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        disabled={loading}
                                        className="py-2 px-4 border-[1px] rounded-md bg-green-600 dark:hover:bg-green-500 hover:bg-green-700"
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
                    'py-2 px-8 rounded-lg hover:text-zinc-50 transition-[border-color,background-color,color] border-[1px] hover:border-transparent hover:bg-red-600 w-fit self-end font-semibold bg-transparent border-red-600 text-red-600 mobile:px-4'
                }
                onClick={handleInitialBtnClick.bind(null, true)}
            >
                Delete Account
            </button>
        </>
    );
};

export default DeleteAccountButton;
