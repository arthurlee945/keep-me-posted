import ResetPasswordForm from '@/components/Modules/Auth-Components/ResetPasswordForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Reset Password Page',
    description: 'Forgot Password Page',
};
const ResetPassword = ({ searchParams: { token } }: { searchParams: { token: string } }) => {
    return (
        <main className="flex w-full flex-1 items-center justify-center p-5">
            <ResetPasswordForm token={token} />
        </main>
    );
};

export default ResetPassword;
