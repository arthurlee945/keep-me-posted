'use client';
import { LazyMotion, domAnimation, m, useScroll } from 'framer-motion';
import { FC } from 'react';

interface HomePageLineProps {}

const HomePageLine: FC<HomePageLineProps> = () => {
    const { scrollYProgress } = useScroll();
    return (
        <LazyMotion features={domAnimation}>
            <m.div
                aria-label="decorative-line"
                className=" absolute top-[2%] -z-[1] h-[96%] w-[2px] origin-top bg-zinc-900 dark:bg-zinc-50"
                style={{ scaleY: scrollYProgress }}
            ></m.div>
        </LazyMotion>
    );
};

export default HomePageLine;
