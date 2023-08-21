import { FC } from 'react';

interface loadingProps {}

const loading: FC<loadingProps> = () => {
    return (
        <main className="flex flex-1 px-8 py-5 justify-center items-center">
            <h1 className="font-semibold text-3xl mobile:text-xl">Loading...</h1>
        </main>
    );
};

export default loading;
