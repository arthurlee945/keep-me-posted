import AboutContent from '@/components/Modules/AboutContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Keep Me Posted | About Page',
    description: 'Keep Me Post utilizes nextjs to help you keep track of your packages and allows you to keep track of them',
};
const AboutPage = () => {
    return (
        <main className="flex flex-1 items-center justify-center gap-y-4 p-5">
            <AboutContent />
        </main>
    );
};

export default AboutPage;
