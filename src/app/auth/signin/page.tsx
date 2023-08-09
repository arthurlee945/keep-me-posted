import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
//-----------------custom
import { authOptions } from "@/utils/auth/auth";
import SignInForm from "@/components/Modules/Auth-Components/SignInForm";

const SignIn = async () => {
    // const session = await getServerSession(authOptions);
    // if (session) return redirect("/");
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <SignInForm />
        </main>
    );
};

export default SignIn;
