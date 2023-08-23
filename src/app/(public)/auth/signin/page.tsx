import SignInForm from '@/components/Modules/Auth-Components/SignInForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Sign In Page',
    description: 'Sign In Page',
};
const SignIn = async () => {
    return (
        <main className="flex w-full flex-1 items-center justify-center p-5">
            <SignInForm />
        </main>
    );
};

export default SignIn;
