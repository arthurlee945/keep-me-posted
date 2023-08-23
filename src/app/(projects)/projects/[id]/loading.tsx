import { FC } from 'react';

interface loadingProps {}

const loading: FC<loadingProps> = () => {
    return (
        <main className="flex flex-1 items-center justify-center px-8 py-5">
            <h1 className="text-3xl font-semibold mobile:text-xl">Loading...</h1>
        </main>
    );
};

export default loading;
