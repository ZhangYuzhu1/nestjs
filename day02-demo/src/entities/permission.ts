import { Entity, ManyToMany, PrimaryColumn } from 'typeorm'
import { Role } from './role'

@Entity()
export class Permission {
  @PrimaryColumn()
  name: string

  @PrimaryColumn()
  description?: string

  @ManyToMany(() => Role, role => role.permissions)
  roles?: Role[]
}
