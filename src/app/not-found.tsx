import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Keep Me Posted | 404 Page",
    description: "Looks Like you landed in a wrong page for KEEP ME POSTED",
};

const NotFound = () => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <section className="flex flex-col gap-y-4 items-center w-full">
                <h1 className="w-2/3 tablet:w-3/4 mobile:w-full text-center mx-auto my-0 text-xl font-semibold">
                    Looks like you landed in a wrong path
                </h1>
                <Link
                    className="border-[1px] py-2 px-4 rounded-[5px] transition-[letter-spacing] hover:tracking-wider font-semibold"
                    href="/"
                >
                    Go Back Home
                </Link>
            </section>
        </main>
    );
};

export default NotFound;
