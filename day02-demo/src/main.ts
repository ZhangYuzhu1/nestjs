import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import compression from '@fastify/compress'
import fmp from '@fastify/multipart'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  /** 配置swagger文档 */
  const opacity = new DocumentBuilder().setTitle('接口文档').addBearerAuth().setDescription('接口文档').setVersion('1.0').build()
  const document = SwaggerModule.createDocument(app, opacity)
  SwaggerModule.setup('/swagger-ui', app, document)
  /** 启用 压缩 */
  app.register(compression)
  /** 文件 */
  app.register(fmp, {
    attachFieldsToBody: true,
    limits: {
      fileSize: 1024 * 1024 * 1024,
    },
  })
  await app.listen(3001)
}
bootstrap()
