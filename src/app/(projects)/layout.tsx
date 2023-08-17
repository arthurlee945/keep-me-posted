import type { Metadata } from 'next';
import ProjectHeader from '@/components/Modules/layoutParts/ProjectHeader';

export const metadata: Metadata = {
    title: 'Keep Me Posted | Your Project Page',
    description: 'You can manage your projects on this page!',
};

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ProjectHeader />
            {children}
        </>
    );
}
