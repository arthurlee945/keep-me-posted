import type { Metadata } from 'next';
import MainHeader from '@/components/Modules/layoutParts/MainHeader';
import MainFooter from '@/components/Modules/layoutParts/MainFooter';

export const metadata: Metadata = {
    title: 'Keep Me Posted | Keep Your Dependencies Up To Date',
    description: 'Web App to keep tabs on your depreciating packages for your projects',
};

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader />
            {children}
            <MainFooter />
        </>
    );
}
