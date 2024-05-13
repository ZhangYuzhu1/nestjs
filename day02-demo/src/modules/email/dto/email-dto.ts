import { ApiProperty } from '@nestjs/swagger'

export class EmailDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@test.com',
  })
  email: string
}
