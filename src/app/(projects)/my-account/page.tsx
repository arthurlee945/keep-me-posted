import DeleteAccountButton from '@/components/subComponents/accountParts/DeleteAccountButton';
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
        <main className="flex flex-1 px-8 py-5 flex-col gap-y-5 tablet:px-5 mobile:px-3">
            <section className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">My Account</h1>
                <SignOutButton />
            </section>
            <section className="grid grid-cols-3 grid-rows-3 gap-y-8 w-full border-[1px] rounded-lg py-5 px-4">
                <>
                    <p className="font-bold text-lg">Name</p>
                    <p className="text-base">{session.user.name}</p>
                    <p className="place-self-center">Buuton</p>
                </>
                <>
                    <p className="font-bold text-lg">Email</p>
                    <p className="text-base">{session.user.email}</p>
                    <p className="place-self-center">Buuton</p>
                </>
                <>
                    <p className="font-bold text-lg">Password</p>
                    <p className="text-lg">********</p>
                    <p className="place-self-center">Buuton</p>
                </>
            </section>
            <DeleteAccountButton />
        </main>
    );
}
