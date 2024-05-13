import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from 'src/entities/permission'
import { RoleModule } from '../role/role.module'
import { PermissionService } from './permission.service'

@Global()
@Module({
  imports: [
    RoleModule,

    TypeOrmModule.forFeature([Permission]),
  ],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule { }
