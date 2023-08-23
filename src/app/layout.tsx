import '@/styles/font-face.css';
import Providers from '@/utils/Providers';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark ">
            <body
                className="m-[10px] mx-[max(calc((100%-1536px)/2),_10px)] flex min-h-[calc(100vh-20px)] max-w-[1536px] flex-col overflow-x-hidden border-[1px] border-zinc-900
                 bg-zinc-50 text-zinc-900 transition-colors selection:bg-zinc-900
                selection:text-zinc-50 dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-900 
                mobile:m-[8px] mobile:min-h-[calc(100vh-16px)] tablet:m-[8px] tablet:min-h-[calc(100vh-16px)]"
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
