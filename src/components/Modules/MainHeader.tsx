import { FC } from "react";
import Link from "next/link";
import NavComponents from "./nav-components/NavComponents";
interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = () => {
    return (
        <header className="sticky z-10 top-0 w-full p-4 flex items-center justify-between border-b-[1px] bg-inherit tablet:p-3 mobile:p-3">
            <Link className="font-semibold text-xl hover:tracking-widest transition-[letter-spacing]" href="/">
                K.M.P.
            </Link>
            <NavComponents />
        </header>
    );
};

export default MainHeader;
