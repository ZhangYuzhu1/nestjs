import { Entity, ManyToMany, PrimaryColumn } from 'typeorm'
import { Role } from './role'
import { PermissionType } from 'src/types/enum/permission.enum'

@Entity()
export class Permission {
  @PrimaryColumn()
  name: PermissionType

  @PrimaryColumn()
  description?: string

  @ManyToMany(() => Role, role => role.permissions)
  roles?: Role[]

}
