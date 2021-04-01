import './restBuilder';
import {TimeoutInterceptor} from '@common/interceptors';
import {INestApplication, Logger, ValidationPipe} from '@nestjs/common';
import {SwaggerModule} from '@nestjs/swagger';
import {swaggerConfig, swaggerDocumentOptions, swaggerSetupOptions} from '.';
import {RestApiSecurityBasedOnUfsa} from '@config/security';

export class BundleApp {
    private static readonly logger: Logger = new Logger(BundleApp.name);

    private static PREFIX_PORT = 3000;

    private app: INestApplication;

    static builder(): BundleApp {
        return new BundleApp();
    }

    public applyAppContext(app: INestApplication) {
        BundleApp.logger.log('Applying app context to server');
        this.app = app;
        return this;
    }

    public buildDefault() {
        this.prefixOptionsApp();
        this.setSwagger();
        return this;
    }

    private prefixOptionsApp() {
        this.app.setGlobalPrefix('api');
        BundleApp.logger.log('Set global prefix api: /api');
        this.app.useGlobalPipes(new ValidationPipe());
        BundleApp.logger.log('Set global prefix ValidationPipe');
        this.app.useGlobalInterceptors(new TimeoutInterceptor());
        BundleApp.logger.log('Set global prefix TimeoutInterceptor');
        this.app.useGlobalGuards(new RestApiSecurityBasedOnUfsa());
        BundleApp.logger.log('Set authentication model Ufsa');
    }

    private setSwagger() {
        if (process.env.NODE_ENV !== 'production') {

            const document = SwaggerModule.createDocument(
                this.app,
                swaggerConfig,
                swaggerDocumentOptions
            );

            SwaggerModule.setup('docs', this.app, document, swaggerSetupOptions);
        }
    }

    public async listenApp() {
        try {
            const port = process.env.PORT || BundleApp.PREFIX_PORT;
            await this.app.listen(port);
            BundleApp.logger.log(`Application listening on port ${port}`);
        } catch (e) {
            BundleApp.logger.error(e.message());
        }
    }
}
