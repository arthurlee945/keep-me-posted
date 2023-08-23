import VerifyEmailNotice from '@/components/Modules/Auth-Components/VerifyEmailNotice';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Verify Password Page',
    description: 'Verify Password Page',
};
const VerifyEmail = async ({ searchParams: { token } }: { searchParams: { token: string } }) => {
    return (
        <main className="flex w-full flex-1 items-center justify-center p-5">
            <Suspense fallback={<h1 className="text-center text-xl font-semibold">Attempting To Verify...</h1>}>
                <section className="flex w-full flex-col items-center gap-y-4">
                    <h1 className="mx-auto my-0 w-2/3 text-center text-xl font-semibold mobile:w-full tablet:w-3/4">
                        <VerifyEmailNotice token={token} />
                    </h1>
                    <Link
                        className="rounded-[5px] border-[1px] px-4 py-2 font-semibold transition-[letter-spacing] hover:tracking-wider"
                        href="/"
                    >
                        Go Back
                    </Link>
                </section>
            </Suspense>
        </main>
    );
};

export default VerifyEmail;
