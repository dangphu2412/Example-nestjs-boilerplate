import { NodePlopAPI } from 'plop';
import { GENERATOR } from './enums';
import { ROOT_DIR } from './constants';
import {
    generateService,
    generateBaseBoilerplate,
    generateEntityBoilerplate,
    generateFactoryBoilerplate
} from './tasks';

export default function (plop: NodePlopAPI) {
    plop.setGenerator(GENERATOR.SERVICE, generateService(ROOT_DIR));

    plop.setGenerator(GENERATOR.BASE, generateBaseBoilerplate(ROOT_DIR));

    plop.setGenerator(GENERATOR.ENTITY, generateEntityBoilerplate(ROOT_DIR));

    plop.setGenerator(GENERATOR.FACTORY, generateFactoryBoilerplate(ROOT_DIR));
};