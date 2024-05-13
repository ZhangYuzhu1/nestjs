import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module, forwardRef } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { JwtAuthService } from './jwt-auth.service'

@Module({
  imports: [
    forwardRef(() => AuthModule),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (_: ConfigService) => {
        return {}
      },
    }),
  ],
  providers: [JwtAuthService, JwtService],
  exports: [JwtAuthService, JwtService],
})
export class JwtAuthModule { }
