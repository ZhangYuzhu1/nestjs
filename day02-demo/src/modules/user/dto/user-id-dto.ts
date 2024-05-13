import { ApiProperty } from '@nestjs/swagger'

export class CatIdDto {
  @ApiProperty({
    description: '用户唯一标识',
    type: () => String,
    example: '00000000-0000-0000-0000-000000000000',
  })
  id: string
}
