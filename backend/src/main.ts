import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as sourceMapSupport from 'source-map-support';
// import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

sourceMapSupport.install();

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api-forum');
  app.use(cookieParser());

  // const config = new DocumentBuilder()
  //   .setTitle('TD forum backend')
  //   .setDescription('REST API doc')
  //   .setVersion('1.0.0')
  //   .addTag('SEOUL')
  //   .build()
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
