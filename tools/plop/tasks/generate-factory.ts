import { PlopGeneratorConfig } from 'node-plop';

export const generateFactoryBoilerplate = (ROOT_DIR: string): PlopGeneratorConfig => {
    return {
        description: 'Generate factory',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Please type factory you want to generate ? : '
        }],
        actions: [
            {
                type: 'add',
                path: `${ROOT_DIR}/src/database/factories/{{name}}.factory.ts`,
                templateFile: `${ROOT_DIR}/samples/factory/index.ts`
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
