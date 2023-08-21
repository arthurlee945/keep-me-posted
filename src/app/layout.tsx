import '@/styles/font-face.css';
import Providers from '@/utils/Providers';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark ">
            <body
                className="flex overflow-x-hidden flex-col max-w-[1536px] m-[10px] mx-[max(calc((100%-1536px)/2),_10px)] transition-colors border-[1px] min-h-[calc(100vh-20px)]
                 tablet:m-[8px] tablet:min-h-[calc(100vh-16px)] mobile:m-[8px] mobile:min-h-[calc(100vh-16px)]
                bg-zinc-50 dark:bg-zinc-900 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-50 
                selection:text-zinc-50 selection:bg-zinc-900 dark:selection:text-zinc-900 dark:selection:bg-zinc-50"
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
