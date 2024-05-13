import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from 'src/entities/role'
import { responseError } from 'src/utils/response'
import { UserService } from '../user/user.service'
import { PermissionService } from '../permission/permission.service'
import type { UpsertRoleBodyDto } from './dto/upsert-role.body.dto'
import { defaultRoles } from 'src/types/enum/role.enum'
import { ErrorCode } from 'src/types/enum/error-code.enum'
import { getRandomValues } from 'crypto'
import { getRandomPassword } from 'src/utils/getRandomPassword'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly _roleRepo: Repository<Role>,
    private readonly _userSrv: UserService,
    @Inject(forwardRef(() => PermissionService))
    private readonly _permissionSrv: PermissionService,
  ) { }

  /**
   * 初始化默认角色
   */
  public async initDefaultRoles() {
    // 初始化所有的默认角色
    await this._roleRepo.save(defaultRoles)
    // 将所有超级管理员的角色设置为 root
    await this._userSrv.repo().update(
      { isSysAdmin: true },
      { roleId: defaultRoles[0].id },
    )
  }

  /**
   * 创建/更新角色
   * @param role 
   * @returns 
   */
  public async upsertRole(role: UpsertRoleBodyDto) {
    if (!role.id && this._roleRepo.findOne({ where: { name: role.name } }))
      responseError(ErrorCode.ROLE_NAME_IS_EXIST)

    if (role.id && defaultRoles.some(v => v.id === role.id))
      responseError(ErrorCode.ROLE_UPDATE_ROOT)
    const permissions = await this._permissionSrv.repo().find({ where: {} })
    const saveInfo: Role = {
      ...role,
      id: role.id || getRandomPassword(26, 26, ''),
      permissions: permissions.filter(v => role.permissions.includes(v.name)),
    }
    await this._roleRepo.save(saveInfo)
    return saveInfo
  }

  qb(alias = 'r') {
    return this._roleRepo.createQueryBuilder(alias)
  }

  repo() {
    return this._roleRepo
  }
}
