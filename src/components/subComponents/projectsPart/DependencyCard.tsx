import { processDepCheck } from '@/utils/functions/processDepCheck';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface DependencyCardProps {
    depName: string;
    currentVersion: string;
}
type ProcessedDepType = {
    majorVersionChanged?: boolean;
    latest?: string;
    homepage?: string;
    bugs?: string;
};
const DependencyCard: FC<DependencyCardProps> = ({ depName, currentVersion }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['dependency-display', depName, currentVersion],
        queryFn: async () => {
            const data = await processDepCheck(depName, currentVersion);
            return data;
        },
    });
    const typedData = data as ProcessedDepType;
    return (
        <section className={'grid w-full grid-cols-3 rounded-md border px-4 py-2 mobile:grid-cols-1 mobile:grid-rows-3 mobile:gap-y-4'}>
            <h3 className="font-semibold mobile:place-self-center">{depName}</h3>
            <div className="flex items-center mobile:place-self-center">
                <span>{currentVersion}</span>
                <span>&nbsp;&nbsp;{'=>'}&nbsp;&nbsp;</span>
                <span className={typedData?.majorVersionChanged ? 'text-red-600' : 'text-green-600'}>
                    {isLoading ? 'loading' : typedData.latest}
                </span>
            </div>
            <div className="flex gap-x-7 place-self-center">
                <Link
                    href={typedData?.homepage ?? '/'}
                    className={twMerge(
                        'font-semibold underline hover:no-underline',
                        !typedData?.homepage || isLoading ? 'pointer-events-none line-through' : ''
                    )}
                    target="_blank"
                >
                    Package Home
                </Link>
                <Link
                    href={typedData?.bugs ?? '/'}
                    className={twMerge(
                        'font-semibold underline hover:no-underline',
                        !typedData?.bugs || isLoading ? 'pointer-events-none line-through' : ''
                    )}
                    target="_blank"
                >
                    Bugs
                </Link>
            </div>
        </section>
    );
};

export default DependencyCard;
