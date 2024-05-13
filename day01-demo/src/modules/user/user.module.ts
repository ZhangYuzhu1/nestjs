import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { User } from 'src/entities/user'
import { CodeModule } from '../code/code.module'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
    CodeModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
