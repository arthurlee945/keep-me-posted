import { FC } from "react";
import { getCsrfToken, getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import SignInForm from "@/components/Modules/Auth-Components/SignInForm";
import { authOptions } from "@/utils/auth/auth";
import { redirect } from "next/navigation";

interface SignInProps {}
// const getAuthData = async () => {
//     const session = await getServerSession(authOptions);
//     if (session) return redirect("/");
//     return Promise.all([getProviders(), getCsrfToken()]);
// };
const SignIn: FC<SignInProps> = async () => {
    const session = await getServerSession(authOptions);
    if (session) return redirect("/");
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <SignInForm />
        </main>
    );
};

export default SignIn;
