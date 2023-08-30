import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export default async (app) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('torder Backend')
    .setDescription('torder API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter access token',
        in: 'header',
      },
      'accessToken', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter refresh token',
        in: 'header',
      },
      'refreshToken', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
    ignoreGlobalPrefix: false,
  };

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    options,
  );

  app.disable('etag');

  SwaggerModule.setup('api', app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: (a, b) => {
        return a.split(']')[0].length - b.split(']')[0].length;
      },
    },
  });
};
