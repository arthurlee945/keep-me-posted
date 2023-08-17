import SupportRequestForm from '@/components/Modules/SupportRequestForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Keep Me Posted | Support Page',
    description: 'Submit Support Request to fix bugs etc',
};
const SupportPage = () => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <SupportRequestForm />
        </main>
    );
};

export default SupportPage;
