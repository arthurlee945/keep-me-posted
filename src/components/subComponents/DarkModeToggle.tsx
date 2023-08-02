"use client";
import { useDarkMode } from "@/utils/hooks/useDarkMode";
import { motion } from "framer-motion";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useDarkMode();
    return (
        <div className={`w-16 border-[1px] flex px-[5px] rounded-3xl border-inherit  ${darkMode ? "justify-end" : "justify-start"}`}>
            <motion.button
                layout
                className="bg-zinc-900 dark:bg-zinc-100 w-6 h-6 aspect-square rounded-full transition-colors"
                onClick={() => {
                    setDarkMode(!darkMode);
                }}
            />
        </div>
    );
};

export default DarkModeToggle;
