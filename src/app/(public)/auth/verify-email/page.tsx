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
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <Suspense fallback={<h1 className="text-xl font-semibold text-center">Attempting To Verify...</h1>}>
                <section className="flex flex-col gap-y-4 items-center w-full">
                    <h1 className="w-2/3 tablet:w-3/4 mobile:w-full text-center mx-auto my-0 text-xl font-semibold">
                        <VerifyEmailNotice token={token} />
                    </h1>
                    <Link
                        className="border-[1px] py-2 px-4 rounded-[5px] transition-[letter-spacing] hover:tracking-wider font-semibold"
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
