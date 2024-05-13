import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CatBodyDto {
  @ApiProperty({
    description: 'Cat name',
    example: '小黄',
    type: String,
    uniqueItems: true,
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Cat age',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  age: number

  @ApiProperty({
    description: 'Cat breed',
    example: '中华田园猫',
    type: String,
  })
  @IsString()
  breed: string
}
