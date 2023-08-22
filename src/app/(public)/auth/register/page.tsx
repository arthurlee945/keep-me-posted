import RegisterForm from '@/components/Modules/Auth-Components/RegisterForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Keep Me Posted | Sign Up Page',
    description: 'Sign Up Page',
};
const Register = async () => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <RegisterForm />
        </main>
    );
};

export default Register;
