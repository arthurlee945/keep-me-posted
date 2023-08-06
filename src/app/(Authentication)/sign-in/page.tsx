import { FC } from "react";
import SignInForm from "@/components/Modules/Auth-Components/SignInForm";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
    return (
        <main className="flex-1 w-full flex justify-center items-center">
            <SignInForm />
        </main>
    );
};

export default SignIn;
