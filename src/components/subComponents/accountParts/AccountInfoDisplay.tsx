'use client';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface AccountInfoDisplayProps {
    type: 'email' | 'name';
    placeholder?: string;
    className?: string;
}

const AccountInfoDisplay: FC<AccountInfoDisplayProps> = ({ type, placeholder, className }) => {
    const { data } = useSession();
    return <p className={twMerge('text-base', className)}>{!data ? placeholder : data.user ? data.user[type] : 'undefined'}</p>;
};

export default AccountInfoDisplay;
