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
                className={twMerge('group mb-5 flex w-full items-center justify-between', toggleOpen ? 'is-opened' : '')}
                onClick={() => {
                    setToggleOpen(!toggleOpen);
                }}
            >
                <h2 className="text-xl font-semibold mobile:text-base">{type}</h2>
                <span
                    className={`after:contents-[''] before:contents-[''] relative flex aspect-square h-10 w-10 items-center justify-center 
                transition-transform before:absolute before:h-full before:w-1 before:bg-zinc-900 after:absolute
                after:h-1 after:w-full after:bg-zinc-900 group-[.is-opened]:rotate-45 dark:before:bg-zinc-50 dark:after:bg-zinc-50 mobile:h-8 mobile:w-8`}
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
                    className="flex flex-col gap-y-4 overflow-hidden rounded-md border px-3 py-5"
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
