import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useDarkMode = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [isInitial, setIsInitial] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(true);
    useEffect(() => {
        if (isInitial) {
            let browserPref =
                localStorage.theme === 'dark' || (!('theme' in localStorage) && window?.matchMedia('(prefers-color-scheme: dark)').matches);
            !browserPref && setDarkMode(browserPref);
            setIsInitial(false);
            return;
        }
        const htmlEl = document.body.parentElement;
        if (darkMode && !htmlEl?.classList.contains('dark')) {
            localStorage.theme = 'dark';
            htmlEl?.classList.add('dark');
        } else if (!darkMode && htmlEl?.classList.contains('dark')) {
            localStorage.theme = 'light';
            htmlEl?.classList.remove('dark');
        }
    }, [isInitial, darkMode]);
    return [darkMode, setDarkMode];
};
