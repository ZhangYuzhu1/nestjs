import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from 'src/entities/role'
import { defaultRoles } from 'src/types/enum/role.enum'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { PermissionService } from '../permission/permission.service'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly _roleRepo: Repository<Role>,
    private readonly _userSrv: UserService,
    // @Inject(forwardRef(() => PermissionService))
    // private readonly _permissionSrv: PermissionService,
  ) { }

  /** 初始化默认角色 */
  public async initDefaultRoles() {
    await this._roleRepo.save(defaultRoles)
    await this._userSrv.repo().update(
      { isSysAdmin: true },
      { roleId: defaultRoles[0].id },
    )
  }

  qb(alias = 'r') {
    return this._roleRepo.createQueryBuilder(alias)
  }

  repo() {
    return this._roleRepo
  }
}
