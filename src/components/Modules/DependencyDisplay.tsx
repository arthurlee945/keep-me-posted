import { FC } from 'react';
import DependencySection from '../subComponents/projectsPart/DependencySection';

type depType = { [depName: string]: string };
interface DependencyDisplayProps {
    deps: {
        dependencies: depType | null;
        devDependencies: depType | null;
        peerDependencies: depType | null;
    };
}

const DependencyDisplay: FC<DependencyDisplayProps> = ({ deps }) => {
    return (
        <section className="flex flex-col gap-y-7">
            {deps.dependencies && <DependencySection isInitial={true} type="Dependencies" data={deps.dependencies} />}
            {deps.devDependencies && <DependencySection isInitial={false} type="DevDependencies" data={deps.devDependencies} />}
        </section>
    );
};

export default DependencyDisplay;
