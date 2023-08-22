import ResetPasswordForm from '@/components/Modules/Auth-Components/ResetPasswordForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Reset Password Page',
    description: 'Forgot Password Page',
};
const ResetPassword = ({ searchParams: { token } }: { searchParams: { token: string } }) => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <ResetPasswordForm token={token} />
        </main>
    );
};

export default ResetPassword;
