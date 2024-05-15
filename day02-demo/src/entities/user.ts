import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from './role'
import { Cat } from './cat'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  account: string

  @Column({ select: false })
  password: string

  @Column()
  email: string

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn()
  role: Role

  @Column({ nullable: true })
  roleId: Role['id']

  @Column({ select: false, default: false })
  isSysAdmin?: boolean

  @OneToMany(() => Cat, cat => cat.user)
  cats: Cat[]

  // @Column({ nullable: true })
  // catId: Cat['name']
}
