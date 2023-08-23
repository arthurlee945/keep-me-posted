'use client';
import { signOut } from 'next-auth/react';
import { FC } from 'react';

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = () => {
    return (
        <button
            className={
                'w-fit self-end rounded-lg border-[1px] border-transparent bg-red-600 px-8 py-2 font-semibold text-zinc-50 transition-[border-color,background-color,color] hover:border-red-600 hover:bg-transparent hover:text-red-600 mobile:px-4'
            }
            onClick={() => {
                signOut({ callbackUrl: '/' });
            }}
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
