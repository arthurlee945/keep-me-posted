import "./globals.css";
import "@/styles/font-face.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Keep Me Posted",
    description: "Web App to keep tabs on your depreciating packages for your projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
