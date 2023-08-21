'use client';
import DarkModeToggle from '@/components/subComponents/DarkModeToggle';
import DefaultButton from '@/components/subComponents/DefaultButton';
import { useRouteChangeStarted } from '@/utils/hooks/useRouteChangeStarted';
import { useViewPortTracker } from '@/utils/hooks/useViewportTracker';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ProjNavComponentsProps {}

const ProjNavComponents: FC<ProjNavComponentsProps> = () => {
    const viewport = useViewPortTracker();
    const [navVisible, setNavVisible] = useState(false);
    const routeChangeStarted = useRouteChangeStarted();
    useEffect(() => {
        if (viewport === 'mobile') {
            document.body.setAttribute('style', navVisible ? 'overflow:hidden;' : '');
            // document.getElementsByTagName("html")[0].setAttribute("style", navVisible ? "scrollbar-gutter:stable;" : "");
        } else if (navVisible) {
            document.body.setAttribute('style', '');
            // document.getElementsByTagName("html")[0].setAttribute("style", "");
        }
    }, [navVisible, viewport]);
    if ((navVisible && viewport === 'desktop') || (viewport !== 'desktop' && routeChangeStarted)) setNavVisible(false);
    return (
        <section className="flex items-center gap-x-3">
            <button
                id="nav-button"
                className={twMerge(
                    `group z-10 desktop:hidden w-9 h-8 flex flex-col items-center justify-between ${navVisible ? 'nav-visible' : ''}
                    before:content-[''] before:w-full before:h-1 before:dark:bg-zinc-50 before:bg-zinc-900 before:transition-transform before:origin-top-left before:transform [&.nav-visible]:before:rotate-45 [&.nav-visible]:before:w-[110%]
                    after:content-[''] after:w-full after:h-1 after:dark:bg-zinc-50 after:bg-zinc-900 after:transition-[transform,width] after:origin-bottom-left after:transform [&.nav-visible]:after:-rotate-45 [&.nav-visible]:after:w-[110%]`
                )}
                onClick={() => {
                    setNavVisible(!navVisible);
                }}
            >
                <div className="w-full h-1 dark:bg-zinc-50 bg-zinc-900 group-hover:w-3/4 transition-[width,opacity] group-[.nav-visible]:opacity-0"></div>
            </button>
            <LazyMotion features={domAnimation}>
                <m.nav
                    key={viewport + '-nav'}
                    className={`flex gap-x-5 items-center
                    tablet:absolute tablet:overflow-hidden tablet:top-1 tablet:right-2 tablet:border-[1px] tablet:px-3 tablet:flex-col tablet:backdrop-blur-md dark:tablet:backdrop-brightness-75 tablet:backdrop-brightness-125 tablet:gap-y-4 tablet:min-w-[250px] 
                    mobile:absolute mobile:overflow-hidden mobile:top-0 mobile:-right-[1px] mobile:border-[1px] mobile:px-3 mobile:flex-col mobile:backdrop-blur-md dark:mobile:backdrop-brightness-75 mobile:backdrop-brightness-125 mobile:gap-y-4 mobile:w-[calc(100%+2px)] mobile:h-screen mobile:justify-around`}
                    initial={{ height: 0, paddingBottom: 0, borderWidth: 0 }}
                    animate={{
                        height: !navVisible ? 0 : viewport === 'mobile' ? '100vh' : 'auto',
                        borderWidth: navVisible ? 1 : 0,
                    }}
                    aria-hidden={!navVisible}
                >
                    <DarkModeToggle className="tablet:mt-[60px]" />
                    <Link href="/projects" className="font-bold text-lg hover:underline">
                        My Projects
                    </Link>
                    <Link href="/support" className="font-bold text-lg hover:underline">
                        Support
                    </Link>
                    <DefaultButton buttonType="link" href="/my-account" className="tablet:mb-3">
                        My Account
                    </DefaultButton>
                </m.nav>
            </LazyMotion>
        </section>
    );
};

export default ProjNavComponents;
