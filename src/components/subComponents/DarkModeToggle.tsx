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
                `w-14 border-[1px] flex h-fit rounded-3xl border-zinc-900 dark:border-zinc-100  ${
                    darkMode ? 'justify-end' : 'justify-start'
                }`,
                className
            )}
        >
            <LazyMotion features={domAnimation}>
                <m.button
                    layout
                    className="bg-zinc-900 dark:bg-zinc-100 w-[22px] h-[22px] p-[2px] aspect-square rounded-full transition-colors"
                    onClick={() => {
                        setDarkMode(!darkMode);
                    }}
                >
                    <AnimatePresence initial={false} mode="wait">
                        {darkMode ? (
                            <m.span
                                key="moon-icon"
                                className="flex w-full h-full"
                                animate={{ rotate: '360deg' }}
                                exit={{ rotate: '0deg' }}
                                transition={{ duration: 0.15 }}
                            >
                                <Moon />
                            </m.span>
                        ) : (
                            <m.span
                                key="sun-icon"
                                className="flex w-full h-full"
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
