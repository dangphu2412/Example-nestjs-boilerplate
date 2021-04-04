import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BundleApp} from './config';
import * as env from 'dotenv';
import {AuthorizationContainer} from '@packages/ufsaModel/core/security/AuthorizationLookup';
import {Rules} from './rules';
import { authorizationContainer } from '@config/authorizationContainer';

env.config();

(async function bootstrap() {
    /**
   * App Config
   */
    const app = await NestFactory.create(AppModule, {
        cors: true
    });

    await BundleApp
        .builder()
        .applyAppContext(app)
        .buildDefault()
        .listenApp();

    authorizationContainer
        .applyAppContext(app);
}) ()

