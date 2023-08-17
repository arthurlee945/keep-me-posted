import Link from 'next/link';

const MainFooter = () => {
  return (
    <section className="w-full p-3 flex items-center justify-center border-t-[1px] tablet:p-2 mobile:p-2 ">
      <p className="text-sm pr-2 border-r-2">
        Made By{' '}
        <Link
          href="https://github.com/arthurlee945/keep-me-posted"
          target="_blank"
          className="underline dark:hover:text-blue-300 hover:text-blue-600 text-base font-semibold"
        >
          Me!
        </Link>
      </p>
      <Link href="/contact-us" className="hover:underline ml-2">
        Contact Us
      </Link>
    </section>
  );
};

export default MainFooter;
