import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ScheduleModule } from '@nestjs/schedule'
import { join } from 'node:path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, RequestMethod } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'

import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'

import allConfig from './config'
import { LogModule } from './modules/log/log.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { RoleModule } from './modules/role/role.module'
import { RedisModule } from './modules/redis/redis.module'
import { PermissionModule } from './modules/permission/permission.module'

import { AuthMiddleware } from './middleware/auth.middleware'
import { InfoMiddleware } from './middleware/info.middleware'
import { AccessMiddleware } from './middleware/access.middleware'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import { ThrottlerExceptionFilter } from './filter/throttler-exception.filter'
import { EmailModule } from './modules/email/email.module'
import { validatePath } from './utils/validatePath'

@Module({
  imports: [
    // Internal Modules
    LogModule,
    UserModule,
    AuthModule,
    RoleModule,
    RedisModule,
    PermissionModule,
    EmailModule,

    // External Modules
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({ ttl: 10, limit: 30 }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env.staging', '.env.production', '.env'],
      isGlobal: true,
      cache: true,
      load: [...allConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_cfgSrv: ConfigService) =>
        _cfgSrv.get<TypeOrmModuleOptions>('db'),
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_cfgSrv: ConfigService) => [
        {
          rootPath: join(__dirname, 'public'),
          serveRoot: validatePath(_cfgSrv.get('SERVER_BASE_PATH')),
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: ThrottlerExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InfoMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
    consumer.apply(AccessMiddleware)
      .exclude(
        { path: 'log/(.*)', method: RequestMethod.ALL },
      ).forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}
