import { Controller, Get } from '@nestjs/common'
import { RoleService } from './role.service'
import { ApiTags } from '@nestjs/swagger'
import { HasPermission } from 'src/guards/permission.guard'
import { PermissionType } from 'src/types/enum/permission.enum'

@Controller('role')
@ApiTags('角色管理')
export class RoleController {
  constructor(private readonly _roleSrv: RoleService) {
  }
  @Get('list')
  @HasPermission([
    PermissionType.ROLE_QUERY
  ])
  public async getRoleList() {
    return await this._roleSrv.repo().find({
      where: {},
      relations: { permissions: true }
    })
  }
}
