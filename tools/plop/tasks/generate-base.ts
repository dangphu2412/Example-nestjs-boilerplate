import { PlopGeneratorConfig } from 'node-plop';
import { FULL_OPTIONS } from '../constants';
import { BASE_KEY } from '../enums';
import { generateDirIfNotExisted, generateAction } from '../utils';

export const generateBaseBoilerplate = (ROOT_DIR: string): PlopGeneratorConfig => {
    return {
        description: 'Generate base code',
        prompts: [
            {
                type: 'input',
                name: 'module',
            },
            {
                type: 'list',
                name: 'base',
                message: 'Please pick a base to be generated: ',
                choices: [
                    {
                        name: BASE_KEY.CONTROLLER,
                        value: BASE_KEY.CONTROLLER
                    },
                    {
                        name: BASE_KEY.SERVICE,
                        value: BASE_KEY.SERVICE
                    },
                    {
                        name: BASE_KEY.REPOSITORY,
                        value: BASE_KEY.REPOSITORY
                    },
                    {
                        name: BASE_KEY.MODULE,
                        value: BASE_KEY.MODULE
                    },
                    {
                        name: FULL_OPTIONS,
                        value: FULL_OPTIONS
                    }
                ]
            }
        ],
        actions: (action) => {
            const { module, base } = action;
            const dir = `${ROOT_DIR}/src/app/${module}`;


            let finalActions = [];

            generateDirIfNotExisted(dir);

            if (action.base === FULL_OPTIONS) {
                finalActions = Object.values(BASE_KEY).map((baseValue) => generateAction(dir, ROOT_DIR, baseValue));
                return finalActions;
            }

            finalActions.push(generateAction(dir, ROOT_DIR, base));
            return finalActions;
        }
    }
}
