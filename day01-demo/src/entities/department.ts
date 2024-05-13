import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Department {
  @ApiProperty({ description: '部门唯一标识' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ description: '部门名称' })
  @Column({ unique: true })
  name: string

  @ApiProperty({ description: '领导人' })
  @Column()
  leader: string

  // @OneToMany(() => User, user => user.department)
  // users?: User[]
}