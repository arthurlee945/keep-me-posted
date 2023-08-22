import SignInForm from '@/components/Modules/Auth-Components/SignInForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Sign In Page',
    description: 'Sign In Page',
};
const SignIn = async () => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <SignInForm />
        </main>
    );
};

export default SignIn;
