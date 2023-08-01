import "./globals.css";
import "@/styles/font-face.css";
import type { Metadata } from "next";
import Header from "./Header";

export const metadata: Metadata = {
    title: "Keep Me Posted",
    description: "Web App to keep tabs on your depreciating packages for your projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-zinc-950 m-4 border-2 border-neutral-100 min-h-[calc(100vh-32px)] text-white">
                <Header />
                {children}
            </body>
        </html>
    );
}
