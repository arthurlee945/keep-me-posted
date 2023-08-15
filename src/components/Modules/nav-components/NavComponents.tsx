"use client";
import DarkModeToggle from "@/components/subComponents/DarkModeToggle";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import HeaderAuthButton from "./HeaderAuthButton";
import { twMerge } from "tailwind-merge";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useViewPortTracker } from "@/utils/hooks/useViewportTracker";

interface NavComponentsProps {}

const NavComponents: FC<NavComponentsProps> = () => {
    const viewport = useViewPortTracker();
    const [navVisible, setNavVisible] = useState(false);
    useEffect(() => {
        if (viewport === "mobile") {
            document.body.setAttribute("style", navVisible ? "overflow:hidden;" : "");
        } else if (navVisible) {
            document.body.setAttribute("style", "");
        }
    }, [navVisible, viewport]);
    if (navVisible && viewport === "desktop") setNavVisible(false);
    return (
        <section className="relative flex items-center gap-x-3">
            <button
                id="nav-button"
                className={twMerge(
                    `group z-10 desktop:hidden w-9 h-8 flex flex-col items-center justify-between ${navVisible ? "nav-visible" : ""}
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
                    key={viewport + "-nav"}
                    className={`flex gap-x-4 items-center
                    tablet:absolute tablet:overflow-hidden tablet:-top-2 tablet:-right-1 tablet:border-[1px] tablet:px-3 tablet:flex-col tablet:backdrop-blur-md tablet:gap-y-4 tablet:w-[200px] 
                    mobile:absolute mobile:overflow-hidden mobile:-top-4 mobile:-right-4 mobile:border-[1px] mobile:px-3 mobile:flex-col mobile:backdrop-blur-md mobile:gap-y-4 mobile:w-[calc(100vw-18px)] mobile:h-screen mobile:justify-around`}
                    initial={{ height: 0, paddingBottom: 0, borderWidth: 0 }}
                    animate={{
                        height: !navVisible ? 0 : viewport === "mobile" ? "calc(100vh - 18px)" : "auto",
                        borderWidth: navVisible ? 1 : 0,
                    }}
                    aria-hidden={!navVisible}
                >
                    <DarkModeToggle className="tablet:mt-[60px]" />
                    <Link href="/about">About</Link>
                    <HeaderAuthButton className="tablet:mb-3" />
                </m.nav>
            </LazyMotion>
        </section>
    );
};

export default NavComponents;
