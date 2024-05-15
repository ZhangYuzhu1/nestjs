import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { RoleService } from './role.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { HasPermission } from 'src/guards/permission.guard'
import { PermissionType } from 'src/types/enum/permission.enum'
import { CreateRoleDto } from './dto/create-role.dto'
import { RoleIdDto } from './dto/role-id.dto'

@Controller('role')
@ApiTags('角色管理')
export class RoleController {
  constructor(private readonly _roleSrv: RoleService) {
  }

  @ApiOperation({ summary: '获取角色列表' })
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

  @ApiOperation({ summary: '添加/更新角色' })
  @HasPermission([PermissionType.ROLE_CREATE, PermissionType.ROLE_UPDATE], 'AND')
  @Post()
  public async upsertRole(@Body() body: CreateRoleDto) {
    return await this._roleSrv.upsertRole(body)
  }

  @ApiOperation({ summary: '删除角色' })
  @HasPermission([
    PermissionType.ROLE_DELETE
  ])
  @Delete(':roleId')
  public async deleteRole(@Param() param: RoleIdDto) {
    return await this._roleSrv.deleteRole(param.roleId)
  }
}
