'use client';
import { useDarkMode } from '@/utils/hooks/useDarkMode';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
//------------icons
import Moon from '@/styles/icons/moon.svg';
import Sun from '@/styles/icons/sun.svg';
import { twMerge } from 'tailwind-merge';

const DarkModeToggle = ({ className }: { className?: string }) => {
    const [darkMode, setDarkMode] = useDarkMode();
    return (
        <div
            className={twMerge(
                `flex h-fit w-14 rounded-3xl border-[1px] border-zinc-900 dark:border-zinc-100  ${
                    darkMode ? 'justify-end' : 'justify-start'
                }`,
                className
            )}
        >
            <LazyMotion features={domAnimation}>
                <m.button
                    layout
                    className="aspect-square h-[22px] w-[22px] rounded-full bg-zinc-900 p-[2px] transition-colors dark:bg-zinc-100"
                    onClick={() => {
                        setDarkMode(!darkMode);
                    }}
                >
                    <AnimatePresence initial={false} mode="wait">
                        {darkMode ? (
                            <m.span
                                key="moon-icon"
                                className="flex h-full w-full"
                                animate={{ rotate: '360deg' }}
                                exit={{ rotate: '0deg' }}
                                transition={{ duration: 0.15 }}
                            >
                                <Moon />
                            </m.span>
                        ) : (
                            <m.span
                                key="sun-icon"
                                className="flex h-full w-full"
                                animate={{ rotate: '360deg' }}
                                exit={{ rotate: '0deg' }}
                                transition={{ duration: 0.15 }}
                            >
                                <Sun />
                            </m.span>
                        )}
                    </AnimatePresence>
                </m.button>
            </LazyMotion>
        </div>
    );
};

export default DarkModeToggle;
