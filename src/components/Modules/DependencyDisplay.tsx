import { JsonValue } from '@prisma/client/runtime/library';
import { FC } from 'react';
import DependencySection from '../subComponents/projectsPart/DependencySection';

type depType = { [depName: string]: string };
interface DependencyDisplayProps {
    deps: {
        dependencies: JsonValue | null;
        devDependencies: JsonValue | null;
        peerDependencies: JsonValue | null;
    };
}

const DependencyDisplay: FC<DependencyDisplayProps> = ({ deps }) => {
    return (
        <section className="flex flex-col gap-y-7">
            {deps.dependencies && <DependencySection isInitial={true} type="Dependencies" data={deps.dependencies as depType} />}
            {deps.devDependencies && (
                <DependencySection isInitial={!deps.dependencies || false} type="DevDependencies" data={deps.devDependencies as depType} />
            )}
            {deps.peerDependencies && (
                <DependencySection
                    isInitial={(!deps.dependencies && !deps.peerDependencies) || false}
                    type="PeerDependencies"
                    data={deps.peerDependencies as depType}
                />
            )}
        </section>
    );
};

export default DependencyDisplay;
