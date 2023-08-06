import "./globals.css";
import "@/styles/font-face.css";
import type { Metadata } from "next";
import MainHeader from "@/components/Modules/MainHeader";
import AuthProvider from "@/utils/auth/AuthProvider";

export const metadata: Metadata = {
    title: "Keep Me Posted | Keep Your Dependencies Up To Date",
    description: "Web App to keep tabs on your depreciating packages for your projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body
                className="flex flex-col max-w-[1536px] m-[10px] mx-[max(calc((100%-1536px)/2),_10px)] transition-colors border-[1px] min-h-[calc(100vh-20px)] lg:m-[8px] lg:min-h-[calc(100vh-16px)]
                bg-zinc-50 dark:bg-zinc-900 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-50 
                selection:text-zinc-50 selection:bg-zinc-900 dark:selection:text-zinc-900 dark:selection:bg-zinc-50"
            >
                <AuthProvider>
                    <MainHeader />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
