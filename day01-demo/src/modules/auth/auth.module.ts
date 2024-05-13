import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { CodeModule } from '../code/code.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Login } from 'src/entities/login'
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    CodeModule,
    JwtAuthModule,

    TypeOrmModule.forFeature([Login]),
    forwardRef(() => JwtAuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
