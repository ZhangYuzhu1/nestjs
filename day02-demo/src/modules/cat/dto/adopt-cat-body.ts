import { ApiProperty } from "@nestjs/swagger";

export class AdoptCatBody {
  @ApiProperty({
    description: 'User id',
    type: String,
  })
  userId: string

  @ApiProperty({
    description: 'Cat id',
    type: String,
  })
  catId: string
}
