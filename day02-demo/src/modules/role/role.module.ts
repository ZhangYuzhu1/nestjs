import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from 'src/entities/role'
import { UserModule } from '../user/user.module'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'

@Global()
@Module({
  imports: [
    UserModule,

    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule { }
