import type { OnModuleInit } from '@nestjs/common'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from 'src/entities/permission'
import { PermissionType, permissionDescriptions } from 'src/types/enum/permission.enum'
import { In, Not, Repository } from 'typeorm'
import { RoleService } from '../role/role.service'

@Injectable()
export class PermissionService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private readonly _permissionRepo: Repository<Permission>,
    @Inject(forwardRef(() => RoleService))
    private readonly _roleSrv: RoleService,
  ) { }

  onModuleInit() {
    this.initPermissions()
  }

  /** 初始化权限 */
  private async initPermissions() {
    await Promise.all((Object.entries(permissionDescriptions) as Array<[PermissionType, string]>).map(async ([name, description]) => {
      try {
        await this._permissionRepo.save({ name, description })
      }
      catch (error) { }
      await this._permissionRepo.delete({ name: Not(In(Object.keys(permissionDescriptions))) })
    }))

    await this._roleSrv.initDefaultRoles()
  }

  public repo() {
    return this._permissionRepo
  }
}
