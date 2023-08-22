import HomePageLine from '@/components/Modules/HomePageLine';
import Image from 'next/image';
import Link from 'next/link';
export default async function Home() {
    return (
        <main className="relative flex flex-1 px-10 py-5 flex-col gap-y-[100px] items-center tablet:px-5 mobile:px-3 mobile:gap-y-[70px]">
            <h1 className="font-semibold text-5xl my-[30vh] py-4 transition-[background-color] mobile:text-4xl mobile:my-[15vh] dark:bg-zinc-900 bg-zinc-50 cursor-default text-center">
                {'Keep Me Posted'.split('').map((txt, i) => (
                    <span className="hover:font-extrabold transition-[font-weight]" key={txt + '-' + i}>
                        {txt}
                    </span>
                ))}
            </h1>
            <section className="flex justify-between w-full mobile:flex-col mobile:gap-y-5">
                <div className="w-[47%] py-4 mobile:w-full transition-[background-color] dark:bg-zinc-900 bg-zinc-50">
                    <h2 className="text-xl font-semibold mb-7">How do you keep track of your dependencies?</h2>
                    <div className="flex flex-col gap-y-5">
                        <p>
                            Picture this: You&apos;re sipping your coffee, pondering the mysteries of design, and suddenly, a light bulb
                            moment strikes!
                        </p>
                        <p>
                            You rush to your computer, fire up our platform, and in a matter of minutes, you&apos;ve turned your brilliant
                            idea into a prototype that even your grandma could navigate. 👵🚀
                        </p>
                        <p>And a month later, packages you relied on is depreciated...</p>
                        <p>
                            <span className="font-semibold">P.S.</span> Have you tried KBBQ? You are missing out if you haven&apos;t
                        </p>
                    </div>
                </div>
                <div className="relative w-[47%] aspect-video p-5 border shadow-lg rounded-md overflow-hidden mobile:w-full">
                    <Image
                        src="/sample-page.jpg"
                        sizes="100%"
                        className="object-cover object-left-top transition-transform hover:scale-110 origin-top-left"
                        fill
                        alt="keep me posted project display sample"
                    />
                </div>
            </section>
            <section className="flex justify-between w-full mobile:flex-col-reverse mobile:gap-y-5">
                <div className="relative w-[47%] aspect-video border shadow-lg rounded-md overflow-hidden mobile:w-full">
                    <Image
                        src="/sample-page-2.jpg"
                        sizes="100%"
                        className="object-cover object-left-top transition-transform hover:scale-110 origin-top-left"
                        fill
                        alt="keep me posted project display sample"
                    />
                </div>
                <div className="w-[47%] mobile:w-full py-4 transition-[background-color] dark:bg-zinc-900 bg-zinc-50">
                    <h2 className="text-xl font-semibold mb-7">Keep your project up to date!</h2>
                    <div className="flex flex-col gap-y-5">
                        <p>
                            Now Picture this: You start on a project and it lend in Started Project graveyard for you to return to revive
                            it.
                        </p>
                        <p>
                            You open your folder on VSCode start working on it and new version of package your relied on. Now you have to
                            refactor your code.
                        </p>
                        <p>
                            Well! We can help you with that by keeping track of your packages and notifying you when new major version
                            change happens!
                        </p>
                        <p>
                            <span className="font-semibold">P.S.</span> Also have you tried Korean fried chicken? Best fried chicken in my
                            opinion. 🍗🍗
                        </p>
                    </div>
                </div>
            </section>
            <section className="my-[30vh] mobile:my-[15vh]">
                <Link
                    href="/contact-us"
                    className="font-semibold text-5xl my-[30vh] py-4 mobile:text-4xl mobile:my-[15vh] dark:bg-zinc-900 bg-zinc-50 transition-[background-color] cursor-pointer text-center"
                >
                    {"Let's get started!".split('').map((txt, i) => (
                        <span className="hover:font-extrabold transition-[font-weight]" key={txt + '-last' + '-' + i}>
                            {txt}
                        </span>
                    ))}
                </Link>
            </section>
            <HomePageLine />
        </main>
    );
}
