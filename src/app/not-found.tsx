import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Keep Me Posted | 404 Page',
    description: 'Looks Like you landed in a wrong page for KEEP ME POSTED',
};

const NotFound = () => {
    return (
        <main className="flex w-full flex-1 items-center justify-center p-5">
            <section className="flex w-full flex-col items-center gap-y-4">
                <h1 className="mx-auto my-0 w-2/3 text-center text-xl font-semibold mobile:w-full tablet:w-3/4">
                    Looks like you landed in a wrong path
                </h1>
                <Link
                    className="rounded-[5px] border-[1px] px-4 py-2 font-semibold transition-[letter-spacing] hover:tracking-wider"
                    href="/"
                >
                    Go Back Home
                </Link>
            </section>
        </main>
    );
};

export default NotFound;
