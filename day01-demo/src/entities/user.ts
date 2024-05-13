import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from './role'
import { Login } from './login'
import { IUser } from 'src/types/entities/user.interface'
import { BaseTimeStamp } from './_timestamp'


@Entity()
export class User {
  @ApiProperty({
    description: '用户唯一标识',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '账号',
    uniqueItems: true,
  })
  @Column({ unique: true })
  account: string

  @ApiProperty({ description: '用户名' })
  @Column()
  name: string

  @ApiProperty({ description: '密码' })
  @Column({ nullable: true, select: false })
  password: string

  @ApiPropertyOptional({ description: '邮箱' })
  @Column()
  email?: string

  @ApiPropertyOptional({
    description: '手机号码',
    example: '18888888888',
  })
  @Column({ nullable: true, unique: true })
  phone?: string

  @Column({ default: false })
  isDeleted?: boolean

  @Column({ select: false, default: false })
  isSysAdmin?: boolean

  // @ManyToOne(() => Department, department => department.users)
  // department?: Department

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn()
  role?: Role

  @Column({ nullable: true })
  roleId?: Role['id']

  @OneToMany(() => Login, login => login.user, { cascade: true })
  logins?: Login[]
}
