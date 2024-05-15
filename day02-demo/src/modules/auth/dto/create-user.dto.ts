import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

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

  @ApiProperty({
    description: '用户邮箱',
    example: '2020961521@qq.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: '验证码',
    example: '123456',
  })
  code: string
}
