"use client";
import { useDarkMode } from "@/utils/hooks/useDarkMode";
import { AnimatePresence, motion } from "framer-motion";
//------------icons
import Moon from "@/styles/icons/moon.svg";
import Sun from "@/styles/icons/sun.svg";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useDarkMode();
    return (
        <div
            className={`w-16 border-[1px] flex px-[3px] h-fit rounded-3xl border-zinc-900 dark:border-zinc-100  ${
                darkMode ? "justify-end" : "justify-start"
            }`}
        >
            <motion.button
                layout
                className="bg-zinc-900 dark:bg-zinc-100 w-[22px] h-[22px] p-[2px] aspect-square rounded-full transition-colors"
                onClick={() => {
                    setDarkMode(!darkMode);
                }}
            >
                <AnimatePresence initial={false} mode="wait">
                    {darkMode ? (
                        <motion.span
                            key="moon-icon"
                            className="flex w-full h-full"
                            animate={{ rotate: "360deg" }}
                            exit={{ rotate: "0deg" }}
                            transition={{ duration: 0.15 }}
                        >
                            <Moon />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="sun-icon"
                            className="flex w-full h-full"
                            animate={{ rotate: "360deg" }}
                            exit={{ rotate: "0deg" }}
                            transition={{ duration: 0.15 }}
                        >
                            <Sun />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default DarkModeToggle;
