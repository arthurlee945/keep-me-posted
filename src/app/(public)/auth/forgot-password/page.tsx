import ForgotPasswordForm from '@/components/Modules/Auth-Components/ForgotPasswordForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Forgot Password Page',
    description: 'Forgot Password Page',
};
const ForgotPassword = async () => {
    return (
        <main className="flex w-full flex-1 items-center justify-center p-5">
            <ForgotPasswordForm />
        </main>
    );
};

export default ForgotPassword;
