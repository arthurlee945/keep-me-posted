import "./globals.css";
import "@/styles/font-face.css";
import type { Metadata } from "next";
import Header from "@/components/Modules/Header";

export const metadata: Metadata = {
    title: "Keep Me Posted",
    description: "Web App to keep tabs on your depreciating packages for your projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className="bg-zinc-50 dark:bg-zinc-900 max-w-[1536px] m-[10px] mx-[max(calc((100%-1536px)/2),_10px)] transition-colors border-[1px] border-zinc-900 dark:border-zinc-100 min-h-[calc(100vh-20px)] text-zinc-900 dark:text-zinc-50 lg:m-[8px] lg:min-h-[calc(100vh-16px)]">
                <Header />
                {children}
            </body>
        </html>
    );
}
