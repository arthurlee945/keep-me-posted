import { FC } from "react";
import DarkModeToggle from "../subComponents/DarkModeToggle";
import Link from "next/link";
import DefaultButton from "../subComponents/DefaultButton";

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = () => {
    return (
        <header className="sticky top-0 w-full p-4 flex items-center justify-between border-b-[1px] border-inherit">
            <Link className="font-semibold text-xl hover:tracking-widest transition-[letter-spacing]" href="/">
                K.M.P.
            </Link>
            <div className="flex items-center gap-x-3">
                <DarkModeToggle />
                <DefaultButton buttonType="link" href="api/auth/signin">
                    Get Started/Log In
                </DefaultButton>
            </div>
        </header>
    );
};

export default MainHeader;
