'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FC, useState } from 'react';
import ProjectCard from '../subComponents/projectsPart/ProjectCard';
import ProjectCardLoader from '../subComponents/projectsPart/ProjectCardLoader';

type projectData = {
    id: string;
    createdAt: Date | string;
    title: string;
    visitedAt: Date | string | null;
};

interface ProjectsListProps {
    initialData?: projectData[];
}

const ProjectsList: FC<ProjectsListProps> = ({ initialData }) => {
    const [fetchedAllProj, setFetchedAllProj] = useState(false);
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['project-query'],
        cacheTime: 0,
        queryFn: async ({ pageParam = 1 }) => {
            const { projects } = (await axios.post('/api/project/findMany', { page: pageParam })).data;
            if (projects.length < 4) setFetchedAllProj(true);
            return projects;
        },
        getNextPageParam: (_, pages) => {
            if (fetchedAllProj) return pages.length;
            return pages.length + 1;
        },
        initialData: {
            pages: [initialData],
            pageParams: [1],
        },
    });

    const projects = data?.pages.flatMap((p) => p);
    const lastProjIndex = projects && projects.length - 1;
    return (
        <section className="flex w-full flex-wrap gap-x-[4%] gap-y-7 tablet:justify-between">
            {projects &&
                projects?.map((proj: projectData, i: number) => (
                    <ProjectCard
                        key={`${proj.title}-${i}`}
                        data={proj}
                        isLastProjRendered={!fetchedAllProj && lastProjIndex === i}
                        fetchNextPage={fetchNextPage}
                    />
                ))}
            {isFetchingNextPage && <ProjectCardLoader />}
        </section>
    );
};

export default ProjectsList;
