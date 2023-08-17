import type { Metadata } from "next";
import SupportRequestForm from "@/components/Modules/SupportRequestForm";

type Props = {};
export const metadata: Metadata = {
    title: "Keep Me Posted | Support Page",
    description: "Submit Support Request to fix bugs etc",
};
const SupportPage = (props: Props) => {
    return (
        <main className="flex-1 w-full flex justify-center items-center p-5">
            <SupportRequestForm />
        </main>
    );
};

export default SupportPage;
