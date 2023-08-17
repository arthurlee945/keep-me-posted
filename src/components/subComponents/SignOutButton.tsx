"use client";
import { signOut } from "next-auth/react";
import { FC } from "react";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = () => {
    return (
        <button
            className={
                "py-2 px-8 rounded-lg text-zinc-50 transition-[border-color,background-color,color] border-[1px] border-transparent bg-red-600 w-fit self-end font-semibold hover:bg-transparent hover:border-red-600 hover:text-red-600"
            }
            onClick={() => {
                signOut({ callbackUrl: "/" });
            }}
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
