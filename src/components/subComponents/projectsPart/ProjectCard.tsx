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
            className="flex flex-col justify-between text-start w-[22%] border p-5 rounded-md shadow-lg transition-[filter] hover:brightness-75 tablet:w-[47%] mobile:w-[100%]"
            href={`/projects/${id}`}
        >
            <h2 className="text-lg font-semibold mb-5">{title ?? 'undefined'}</h2>
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
