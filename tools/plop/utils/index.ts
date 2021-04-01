import { existsSync, mkdirSync } from 'fs';

export const generateDirIfNotExisted = (dir: string) => {
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
}

export const generateAction = (dir: string, rootDir: string, base: string) => ({
    type: 'add',
    path: `${dir}/${base}/index.ts`,
    templateFile: `${rootDir}/samples/base/${base}/index.ts`
});