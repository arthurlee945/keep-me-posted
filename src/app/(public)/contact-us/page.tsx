import ContactUsForm from '@/components/Modules/ContactUsForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keep Me Posted | Contact Me Page',
  description: 'Contact Keep Me Posted with inquiries or questions',
};
const ContactUsPage = () => {
  return (
    <main className="flex-1 w-full flex justify-center items-center p-5">
      <ContactUsForm />
    </main>
  );
};

export default ContactUsPage;
