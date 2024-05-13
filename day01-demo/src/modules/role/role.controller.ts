import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { HasPermission } from 'src/guards/permission.guard'
import { RoleService } from './role.service'
import { PermissionType } from 'src/types/enum/permission.enum'
import { UpsertRoleBodyDto } from './dto/upsert-role.body.dto'

@ApiTags('Role | 管理角色')
@Controller('role')
export class RoleController {
  constructor(
    private readonly _roleSrv: RoleService,
  ) { }

  @ApiOperation({ summary: '获取全部角色列表' })
  @HasPermission([
    PermissionType.ROLE_QUERY,
    PermissionType.ROLE_ASSIGN_QUERY,
  ])
  @Get('list')
  public async getRoles() {
    return this._roleSrv.repo().find({
      where: {},
      relations: { permissions: true },
    })
  }

  @ApiOperation({
    summary: '创建/更新角色',
    description: 'id为角色的唯一标识，如果id存在，则会更新角色信息',
  })
  @HasPermission([PermissionType.ROLE_CREATE, PermissionType.ROLE_UPDATE], 'AND')
  @Post('upsert')
  public async upsertRole(@Body() body: UpsertRoleBodyDto) {
    return this._roleSrv.upsertRole(body)
  }
}
