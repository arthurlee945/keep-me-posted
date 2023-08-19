'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
interface ProvidersProps {
    children?: ReactNode;
    session?: Session | null | undefined;
}
const queryClient = new QueryClient();
const Providers: FC<ProvidersProps> = ({ children, session }) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        >
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </SessionProvider>
        </GoogleReCaptchaProvider>
    );
};

export default Providers;
