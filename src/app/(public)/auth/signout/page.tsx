'use client';
import { signOut } from 'next-auth/react';
const SignOutPage = () => {
    signOut({ callbackUrl: '/' });

    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <section className="flex flex-col gap-y-4 items-center w-full">
                <h1 className="w-2/3 tablet:w-3/4 mobile:w-full text-center mx-auto my-0 text-xl font-semibold">Signing Out...</h1>
            </section>
        </main>
    );
};

export default SignOutPage;
