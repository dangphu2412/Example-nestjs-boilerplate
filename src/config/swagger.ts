import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerCustomOptions
} from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true
};

export const swaggerSetupOptions: SwaggerCustomOptions = {
    explorer: true,
    swaggerOptions: {
        docExpansion: false,
        deepLinking: true
    }
};
