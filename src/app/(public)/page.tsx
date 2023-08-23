import HomePageLine from '@/components/Modules/HomePageLine';
import Image from 'next/image';
import Link from 'next/link';
import Image2 from './sample-page-2.webp';
import Image1 from './sample-page.webp';
export default async function Home() {
    return (
        <main className="relative flex flex-1 flex-col items-center gap-y-[100px] px-10 py-5 mobile:gap-y-[70px] mobile:px-3 tablet:px-5">
            <h1 className="my-[30vh] cursor-default bg-zinc-50 py-4 text-center text-5xl font-semibold transition-[background-color] dark:bg-zinc-900 mobile:my-[15vh] mobile:text-4xl">
                {'Keep Me Posted'.split('').map((txt, i) => (
                    <span className="transition-[font-weight] hover:font-extrabold" key={txt + '-' + i}>
                        {txt}
                    </span>
                ))}
            </h1>
            <section className="flex w-full justify-between mobile:flex-col mobile:gap-y-5">
                <div className="w-[47%] bg-zinc-50 py-4 transition-[background-color] dark:bg-zinc-900 mobile:w-full">
                    <h2 className="mb-7 text-xl font-semibold">How do you keep track of your dependencies?</h2>
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
                <div className="relative aspect-video w-[47%] overflow-hidden rounded-md border p-5 shadow-lg mobile:w-full">
                    <Image
                        src={Image1}
                        sizes="100%"
                        className="origin-top-left object-cover object-left-top transition-transform hover:scale-110"
                        fill
                        alt="keep me posted project display sample"
                    />
                </div>
            </section>
            <section className="flex w-full justify-between mobile:flex-col-reverse mobile:gap-y-5">
                <div className="relative aspect-video w-[47%] overflow-hidden rounded-md border shadow-lg mobile:w-full">
                    <Image
                        src={Image2}
                        sizes="100%"
                        className="origin-top-left object-cover object-left-top transition-transform hover:scale-110"
                        fill
                        alt="keep me posted project display sample"
                    />
                </div>
                <div className="w-[47%] bg-zinc-50 py-4 transition-[background-color] dark:bg-zinc-900 mobile:w-full">
                    <h2 className="mb-7 text-xl font-semibold">Keep your project up to date!</h2>
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
                    className="my-[30vh] cursor-pointer bg-zinc-50 py-4 text-center text-5xl font-semibold transition-[background-color] dark:bg-zinc-900 mobile:my-[15vh] mobile:text-4xl"
                >
                    {"Let's get started!".split('').map((txt, i) => (
                        <span className="transition-[font-weight] hover:font-extrabold" key={txt + '-last' + '-' + i}>
                            {txt}
                        </span>
                    ))}
                </Link>
            </section>
            <HomePageLine />
        </main>
    );
}
