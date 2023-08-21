import { JsonValue } from '@prisma/client/runtime/library';
import axios from 'axios';

export const processDepCheck_Depreciated = async (dependencies: JsonValue | undefined) => {
    if (!dependencies || !process.env.NPM_REGISTRY_URL) return;
    try {
        return Promise.all(
            Object.entries(dependencies as object).map(async ([dep, ver]) => {
                const data = (await axios.get(`${process.env.NPM_REGISTRY_URL}${dep}`)).data;
                return {
                    [data._id]: {
                        currentVersion: ver,
                        latest: data['dist-tags']['latest'],
                        homepage: data.versions?.homepage,
                        bugs: data.versions?.bugs?.url,
                    },
                };
            })
        );
    } catch (err) {
        console.log(err);
    }
};

export const processDepCheck = async (depName: string, currVer: string) => {
    try {
        const currMajorVer = currVer.match(/\d+/);
        const data = (await axios.get(`${process.env.NEXT_PUBLIC_NPM_REGISTRY_URL}${depName}`)).data;
        const latestVer = data['dist-tags']['latest'];
        const currNpmVer = data.versions[Object.keys(data.versions)[Object.keys(data.versions).length - 1]];
        return {
            majorVersionChanged: currMajorVer && +currMajorVer[0] < +latestVer.match(/\d+/)[0],
            latest: data['dist-tags']['latest'],
            homepage: currNpmVer?.homepage,
            bugs: currNpmVer?.bugs?.url,
        };
    } catch (err) {
        return err;
    }
};
