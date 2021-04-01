import { PlopGeneratorConfig } from 'node-plop';

export const generateEntityBoilerplate = (ROOT_DIR: string): PlopGeneratorConfig => {
    return {
        description: 'Generate entity',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Please type service you want to generate ? : '
        }],
        actions: [
            {
                type: 'add',
                path: `${ROOT_DIR}/src/entities/{{name}}.entity.ts`,
                templateFile: `${ROOT_DIR}/samples/entity/index.ts`
            },
            {
                type: 'add',
                path: `${ROOT_DIR}/src/entities/base/index.ts`,
                templateFile: `${ROOT_DIR}/samples/entity/base.ts`,
                skipIfExists: true
            }
        ]
    }
}
