'use client';
import { signOut } from 'next-auth/react';
const SignOutPage = () => {
    signOut({ callbackUrl: '/' });

    return (
        <main className="flex w-full flex-1 items-center justify-center p-5">
            <section className="flex w-full flex-col items-center gap-y-4">
                <h1 className="mx-auto my-0 w-2/3 text-center text-xl font-semibold mobile:w-full tablet:w-3/4">Signing Out...</h1>
            </section>
        </main>
    );
};

export default SignOutPage;
