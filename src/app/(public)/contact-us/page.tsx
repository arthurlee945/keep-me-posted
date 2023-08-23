import ContactUsForm from '@/components/Modules/ContactUsForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Keep Me Posted | Contact Me Page',
    description: 'Contact Keep Me Posted with inquiries or questions',
};
const ContactUsPage = () => {
    return (
        <main className="flex w-full flex-1 items-center justify-center p-5">
            <ContactUsForm />
        </main>
    );
};

export default ContactUsPage;
