import { WebSocketGateway } from '@nestjs/websockets';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module, RequestMethod } from '@nestjs/common'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import configAll from './config'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { CatModule } from './modules/cat/cat.module'
import { EmailModule } from './modules/email/email.module'
import { JwtAuthModule } from './modules/jwt-auth/jwt-auth.module'
import { AuthMiddleware } from './middleware/auth.middleware'
import { PermissionModule } from './modules/permission/permission.module'
import { RoleModule } from './modules/role/role.module'
import { FileModule } from './modules/file/file.module'
import { MinioModule } from './modules/minio/minio.module'
import { WebsocketGateway } from './modules/websocket/websocket.gateway';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    CatModule,
    EmailModule,
    ScheduleModule,
    FileModule,
    MinioModule,
    WebsocketGateway,

    ScheduleModule.forRoot(),
    // 加载所有配置
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
      load: [...configAll],
    }),

    // 异步配置数据库配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_cfgSrv: ConfigService) => {
        return _cfgSrv.get<TypeOrmModuleOptions>('db')
      },
    }),
  ],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
