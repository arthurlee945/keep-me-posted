import ForgotPasswordForm from '@/components/Modules/Auth-Components/ForgotPasswordForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Forgot Password Page',
    description: 'Forgot Password Page',
};
const ForgotPassword = async () => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <ForgotPasswordForm />
        </main>
    );
};

export default ForgotPassword;
