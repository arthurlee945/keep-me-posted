'use client';
import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
interface AuthProviderProps {
    children?: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        >
            <SessionProvider>{children}</SessionProvider>
        </GoogleReCaptchaProvider>
    );
};

export default AuthProvider;
