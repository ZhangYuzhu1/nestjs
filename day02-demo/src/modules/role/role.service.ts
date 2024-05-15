import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from 'src/entities/role'
import { defaultRoles } from 'src/types/enum/role.enum'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { PermissionService } from '../permission/permission.service'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly _roleRepo: Repository<Role>,
    private readonly _userSrv: UserService,
    @Inject(forwardRef(() => PermissionService))
    private readonly _permissionSrv: PermissionService,
  ) { }

  /** 初始化默认角色 */
  public async initDefaultRoles() {
    await this._roleRepo.save(defaultRoles)
    await this._userSrv.repo().update(
      { isSysAdmin: true },
      { roleId: defaultRoles[0].id },
    )
  }

  /**创建角色 */
  public async upsertRole(role: CreateRoleDto) {
    if (role.id && await this.repo().findOne({ where: { id: role.name } }))
      throw new HttpException('角色已存在', 400)

    if (role.id && defaultRoles.some(v => v.id === role.id))
      throw new HttpException('系统角色不允许修改', 400)

    const permissions = await this._permissionSrv.repo().find()

    const saveInfo: Role = {
      ...role,
      id: role.id,
      permissions: permissions.filter(v => role.permissions.includes(v.name)),
    }

    await this.repo().save(saveInfo)

    return saveInfo
  }

  /**删除角色 */
  public async deleteRole(roleId: string) {
    if (roleId && !(await this.repo().find({ where: { id: roleId } }))) {
      throw new HttpException('角色不存在', 400)
    }

    if (roleId && defaultRoles.some(v => v.id === roleId))
      throw new HttpException('系统角色不允许删除', 400)
    const newRole = await this.repo().delete(roleId)

    return newRole.affected
  }

  qb(alias = 'r') {
    return this._roleRepo.createQueryBuilder(alias)
  }

  repo() {
    return this._roleRepo
  }
}
