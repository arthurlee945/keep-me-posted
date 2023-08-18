'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
interface AuthProviderProps {
    children?: ReactNode;
    session: Session | null | undefined;
}

const AuthProvider: FC<AuthProviderProps> = ({ children, session }) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        >
            <SessionProvider session={session}>{children}</SessionProvider>
        </GoogleReCaptchaProvider>
    );
};

export default AuthProvider;
