import Link from 'next/link';

const MainFooter = () => {
    return (
        <section className="flex w-full items-center justify-center border-t-[1px] p-3 mobile:p-2 tablet:p-2 ">
            <p className="border-r-2 pr-2 text-sm">
                Made By{' '}
                <Link
                    href="https://github.com/arthurlee945/keep-me-posted"
                    target="_blank"
                    className="text-base font-semibold underline hover:text-blue-600 dark:hover:text-blue-300"
                >
                    Me!
                </Link>
            </p>
            <Link href="/contact-us" className="ml-2 hover:underline">
                Contact Us
            </Link>
        </section>
    );
};

export default MainFooter;
