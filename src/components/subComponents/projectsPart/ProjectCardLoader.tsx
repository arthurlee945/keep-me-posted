const ProjectCardLoader = () => {
    return (
        <div className="flex flex-col justify-between text-start w-[22%] border p-5 aspect-[1/0.4] rounded-md shadow-lg transition-[filter] tablet:w-[47%] mobile:w-[100%] animate-pulse">
            <div className="w-1/2 h-6 bg-zinc-600" />
            <div
                className={`flex flex-col gap-y-1 before:content-[""] before:w-3/5 before:h-5 before:bg-zinc-600 after:content-[""] after:w-4/5 after:h-5 after:bg-zinc-600`}
            />
        </div>
    );
};

export default ProjectCardLoader;
