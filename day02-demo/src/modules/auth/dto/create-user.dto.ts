import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: '用户账号',
    example: '2020961521',
  })
  @IsString()
  @IsNotEmpty()
  account: string

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
