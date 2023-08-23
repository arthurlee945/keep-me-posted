import { FC } from 'react';
import Link from 'next/link';
import ProjNavComponents from '../nav-components/ProjNavComponents';
interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = () => {
    return (
        <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b-[1px] bg-inherit p-4 mobile:p-3 tablet:p-3">
            <Link className="text-xl font-semibold transition-[letter-spacing] hover:tracking-widest" href="/">
                K.M.P.
            </Link>
            <ProjNavComponents />
        </header>
    );
};

export default MainHeader;
