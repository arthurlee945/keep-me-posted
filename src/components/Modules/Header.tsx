import { FC } from "react";
import DarkModeToggle from "../subComponents/DarkModeToggle";
import Link from "next/link";
import DefaultButton from "../subComponents/DefaultButton";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    return (
        <header className="sticky top-0 w-full p-4 flex items-center justify-between border-b-[1px] border-inherit">
            <Link href="/">K.M.P.</Link>
            <div className="flex gap-x-3">
                <DarkModeToggle />
                <DefaultButton buttonType="link" href="/login">
                    HI
                </DefaultButton>
            </div>
        </header>
    );
};

export default Header;
