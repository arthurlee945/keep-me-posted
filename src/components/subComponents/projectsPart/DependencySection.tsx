'use client';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import DependencyCard from './DependencyCard';

interface DependencySectionProps {
    type: 'Dependencies' | 'DevDependencies' | 'PeerDependencies';
    data: { [dep: string]: string };
    isInitial?: boolean;
}

const DependencySection: FC<DependencySectionProps> = ({ type, isInitial = false, data }) => {
    const [toggleOpen, setToggleOpen] = useState(isInitial);
    return (
        <section>
            <button
                className={twMerge('w-full flex items-center justify-between group mb-5', toggleOpen ? 'is-opened' : '')}
                onClick={() => {
                    setToggleOpen(!toggleOpen);
                }}
            >
                <h2 className="font-semibold text-xl mobile:text-base">{type}</h2>
                <span
                    className={`relative flex items-center justify-center w-10 h-10 transition-transform group-[.is-opened]:rotate-45 aspect-square 
                after:contents-[''] after:w-full after:absolute after:h-1 dark:after:bg-zinc-50 after:bg-zinc-900
                before:contents-[''] before:w-1 before:absolute before:h-full dark:before:bg-zinc-50 before:bg-zinc-900 mobile:w-8 mobile:h-8`}
                />
            </button>
            <LazyMotion features={domAnimation}>
                <m.section
                    initial={{
                        height: isInitial ? 'auto' : 0,
                        paddingTop: isInitial ? '1.25rem' : 0,
                        paddingBottom: isInitial ? '1.25rem' : 0,
                    }}
                    animate={{
                        height: toggleOpen ? 'auto' : 0,
                        paddingTop: toggleOpen ? '1.25rem' : 0,
                        paddingBottom: toggleOpen ? '1.25rem' : 0,
                    }}
                    aria-hidden={toggleOpen}
                    className="flex flex-col gap-y-4 border py-5 px-3 overflow-hidden rounded-md"
                >
                    {Object.entries(data).map(([depName, ver], i) => (
                        <DependencyCard key={`${depName}-${ver}-${i}`} depName={depName} currentVersion={ver} />
                    ))}
                </m.section>
            </LazyMotion>
        </section>
    );
};

export default DependencySection;
