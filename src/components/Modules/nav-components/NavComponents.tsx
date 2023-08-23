'use client';
import DarkModeToggle from '@/components/subComponents/DarkModeToggle';
import { useRouteChangeStarted } from '@/utils/hooks/useRouteChangeStarted';
import { useViewPortTracker } from '@/utils/hooks/useViewportTracker';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import HeaderAuthButton from './HeaderAuthButton';

interface NavComponentsProps {}

const NavComponents: FC<NavComponentsProps> = () => {
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
                    `group z-10 flex h-8 w-9 flex-col items-center justify-between desktop:hidden ${navVisible ? 'nav-visible' : ''}
                    before:h-1 before:w-full before:origin-top-left before:transform before:bg-zinc-900 before:transition-transform before:content-[''] after:h-1 after:w-full after:origin-bottom-left
                    after:transform after:bg-zinc-900 after:transition-[transform,width] after:content-[''] before:dark:bg-zinc-50 after:dark:bg-zinc-50 [&.nav-visible]:before:w-[110%] [&.nav-visible]:before:rotate-45 [&.nav-visible]:after:w-[110%] [&.nav-visible]:after:-rotate-45`
                )}
                onClick={() => {
                    setNavVisible(!navVisible);
                }}
            >
                <div className="h-1 w-full bg-zinc-900 transition-[width,opacity] group-hover:w-3/4 group-[.nav-visible]:opacity-0 dark:bg-zinc-50"></div>
            </button>
            <LazyMotion features={domAnimation}>
                <m.nav
                    key={viewport + '-nav'}
                    className={`flex items-center gap-x-5
                    mobile:absolute mobile:-right-[1px] mobile:top-0 mobile:h-screen mobile:w-[calc(100%+2px)] mobile:flex-col mobile:justify-around mobile:gap-y-4 mobile:overflow-hidden mobile:border-[1px] mobile:px-3 mobile:backdrop-blur-md 
                    mobile:backdrop-brightness-125 dark:mobile:backdrop-brightness-75 tablet:absolute tablet:right-2 tablet:top-1 tablet:min-w-[250px] tablet:flex-col tablet:gap-y-4 tablet:overflow-hidden tablet:border-[1px] tablet:px-3 tablet:backdrop-blur-md tablet:backdrop-brightness-125 dark:tablet:backdrop-brightness-75`}
                    initial={{ height: 0, paddingBottom: 0, borderWidth: 0 }}
                    animate={{
                        height: !navVisible ? 0 : viewport === 'mobile' ? '100vh' : 'auto',
                        borderWidth: navVisible ? 1 : 0,
                    }}
                    aria-hidden={!navVisible}
                >
                    <DarkModeToggle className="tablet:mt-[60px]" />
                    <Link href="/about" className="text-lg font-bold hover:underline">
                        About
                    </Link>
                    <HeaderAuthButton className="tablet:mb-3" />
                </m.nav>
            </LazyMotion>
        </section>
    );
};

export default NavComponents;
