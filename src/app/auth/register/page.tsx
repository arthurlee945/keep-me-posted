import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/utils/auth/auth";
import RegisterForm from "@/components/Modules/Auth-Components/RegisterForm";

const SignUp = async () => {
    const session = await getServerSession(authOptions);
    if (session) return redirect("/");
    return (
        <main className="flex-1 w-full flex justify-center items-center">
            <RegisterForm />
        </main>
    );
};

export default SignUp;
