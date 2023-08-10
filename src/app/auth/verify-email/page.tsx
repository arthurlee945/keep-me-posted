import VerifyEmailNotice from "@/components/Modules/Auth-Components/VerifyEmailNotice";
import Link from "next/link";
import { Suspense } from "react";

const VerifyEmail = async ({ searchParams: { token } }: { searchParams: { token: string } }) => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <Suspense fallback={<p>Verifying</p>}>
                <section className="flex flex-col gap-y-4 items-center w-full">
                    <h1 className="w-2/3 lg:w-3/4 sm:w-full text-center mx-auto my-0 text-xl font-semibold">
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
