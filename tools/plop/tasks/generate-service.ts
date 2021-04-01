import { PlopGeneratorConfig } from 'node-plop';

export const generateService = (ROOT_DIR: string): PlopGeneratorConfig => {
    return {
        description: 'Generate services logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Please type service you want to generate ? : '
        }],
        actions: [{
            type: 'add',
            path: `${ROOT_DIR}/src/app/{{name}}/{{name}}.ts`,
            templateFile: `${ROOT_DIR}/samples/service/{{name}}/index.ts`
        }]
    }
}
