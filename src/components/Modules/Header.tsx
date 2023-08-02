import { FC } from "react";
import DarkModeToggle from "../subComponents/DarkModeToggle";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    return (
        <header className="sticky top-0 w-full p-4 flex items-center justify-between border-b-[1px] border-inherit">
            <p>Logo</p>
            <DarkModeToggle />
        </header>
    );
};

export default Header;
