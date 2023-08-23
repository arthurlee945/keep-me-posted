import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import Link from 'next/link';
import { FC, useEffect, useRef } from 'react';
type projectData = {
    id: string;
    createdAt: Date | string;
    title: string;
    visitedAt: Date | string | null;
};
interface ProjectCardProps {
    data: projectData;
    isLastProjRendered: boolean;
    fetchNextPage: (_options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any, unknown>>;
}

const ProjectCard: FC<ProjectCardProps> = ({ data: { id, visitedAt, createdAt, title }, isLastProjRendered, fetchNextPage }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        if (!isLastProjRendered || !cardRef.current) return;
        const options = {};
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    fetchNextPage();
                    observer.unobserve(entry.target);
                    observer.disconnect();
                }
            });
        }, options);
        observer.observe(cardRef.current);
        return () => {
            observer.disconnect();
        };
    }, [isLastProjRendered, fetchNextPage]);
    return (
        <Link
            ref={cardRef}
            className="flex w-[22%] flex-col justify-between rounded-md border p-5 text-start shadow-lg transition-[filter] hover:brightness-75 mobile:w-[100%] tablet:w-[47%]"
            href={`/projects/${id}`}
        >
            <h2 className="mb-5 text-lg font-semibold">{title ?? 'undefined'}</h2>
            <div>
                <p className="text-sm">
                    Visited:{' '}
                    <span className="font-semibold">
                        {visitedAt
                            ? (typeof visitedAt === 'string' ? new Date(visitedAt) : visitedAt).toLocaleDateString('en-us', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                              })
                            : 'New'}
                    </span>
                </p>
                <p className="text-sm">
                    Created:{' '}
                    <span className="font-semibold">
                        {createdAt &&
                            (typeof createdAt === 'string' ? new Date(createdAt) : createdAt).toLocaleDateString('en-us', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                    </span>
                </p>
            </div>
        </Link>
    );
};

export default ProjectCard;
