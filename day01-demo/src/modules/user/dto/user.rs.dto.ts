import { ApiProperty } from '@nestjs/swagger'
import { SuccessDto } from 'src/dto/success.dto'
import { User } from 'src/entities/user'
import { IUserProfileResDto } from 'src/types/http/user/user-profile.interface'

export class UserProfileResponseDto
  extends SuccessDto<User>
  implements IUserProfileResDto {
  @ApiProperty({ type: () => User })
  data: User
}
