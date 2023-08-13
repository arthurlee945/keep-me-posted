import { FC } from "react";
import DarkModeToggle from "../subComponents/DarkModeToggle";
import Link from "next/link";
import HeaderAuthButton from "./HeaderAuthButton";
interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = () => {
    return (
        <header className="sticky top-0 w-full p-4 flex items-center justify-between border-b-[1px]">
            <Link className="font-semibold text-xl hover:tracking-widest transition-[letter-spacing]" href="/">
                K.M.P.
            </Link>
            <div className="flex items-center gap-x-3">
                <DarkModeToggle />
                <HeaderAuthButton />
            </div>
        </header>
    );
};

export default MainHeader;
