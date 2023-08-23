import AccountInfoDisplay from '@/components/subComponents/accountParts/AccountInfoDisplay';
import DeleteAccountButton from '@/components/subComponents/accountParts/DeleteAccountButton';
import EditAccountButton from '@/components/subComponents/accountParts/EditAccountButton';
import SignOutButton from '@/components/subComponents/accountParts/SignOutButton';
import { authOptions } from '@/utils/auth/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Keep Me Posted | My Account',
    description: 'User Account Management Page',
};
export default async function MyAccountPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect('/projects');
    return (
        <main className="flex flex-1 flex-col justify-between px-8 py-5 mobile:px-3 tablet:px-5">
            <div className="flex w-full flex-col gap-y-5">
                <section className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">My Account</h1>
                    <SignOutButton />
                </section>
                <section className="grid w-full grid-cols-3 grid-rows-3 items-center gap-x-2 gap-y-8 rounded-lg border-[1px] px-4 py-5 shadow-md">
                    <>
                        <p className="text-lg font-bold mobile:text-base">Name</p>
                        <AccountInfoDisplay type="name" className="mobile:text-sm" placeholder={session.user.name || 'name'} />
                        <EditAccountButton field="name" className="justify-self-center mobile:text-sm" />
                    </>
                    <>
                        <p className="text-lg font-bold mobile:text-base">Email</p>
                        <AccountInfoDisplay type="email" className="break-all mobile:text-sm" placeholder={session.user.email || 'email'} />
                        <EditAccountButton field="email" className="justify-self-center mobile:text-sm" />
                    </>
                    <>
                        <p className="text-lg font-bold mobile:text-base">Password</p>
                        <p className="text-base mobile:text-sm">********</p>
                        <EditAccountButton field="password" className="justify-self-center mobile:text-sm" />
                    </>
                </section>
            </div>
            <DeleteAccountButton />
        </main>
    );
}
