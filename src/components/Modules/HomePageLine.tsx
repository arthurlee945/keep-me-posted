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
                className=" -z-[1] top-[2%] absolute h-[96%] w-[2px] dark:bg-zinc-50 bg-zinc-900 origin-top"
                style={{ scaleY: scrollYProgress }}
            ></m.div>
        </LazyMotion>
    );
};

export default HomePageLine;
