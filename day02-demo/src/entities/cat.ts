import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity()
export class Cat {
  @ApiProperty({
    description: '猫咪唯一标识',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: 'Breed of the cat',
    example: 'Persian',
  })
  @Column({ unique: true })
  name: string

  @Column()
  age: number

  @Column()
  breed: string

  @ManyToOne(() => User, user => user.cats)
  @JoinColumn()
  user: User

  @Column({ nullable: true })
  userId: User['id']
}
