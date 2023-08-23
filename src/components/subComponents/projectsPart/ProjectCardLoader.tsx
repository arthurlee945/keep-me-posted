const ProjectCardLoader = () => {
    return (
        <div className="flex aspect-[1/0.4] w-[22%] animate-pulse flex-col justify-between rounded-md border p-5 text-start shadow-lg transition-[filter] mobile:w-[100%] tablet:w-[47%]">
            <div className="h-6 w-1/2 bg-zinc-600" />
            <div
                className={`flex flex-col gap-y-1 before:h-5 before:w-3/5 before:bg-zinc-600 before:content-[""] after:h-5 after:w-4/5 after:bg-zinc-600 after:content-[""]`}
            />
        </div>
    );
};

export default ProjectCardLoader;
