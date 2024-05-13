import { ApiProperty } from '@nestjs/swagger'

export class CatIdDto {
  @ApiProperty({
    description: '猫咪唯一标识',
    type: () => String,
    example: '00000000-0000-0000-0000-000000000000',
  })
  id: string
}
