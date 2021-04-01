import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as env from 'dotenv';
import {DB_URI, DB_TYPE, DB_LOGGING} from 'src/env';

env.config({path: '.env'});
export const typeOrmConfig: TypeOrmModuleOptions = {
    url: DB_URI,
    type: <any>DB_TYPE,
    synchronize: false,
    logging: DB_LOGGING,
    entities: ['dist/**/*.entity{.ts,.js}']
};
