import { ApiProperty } from '@nestjs/swagger'
import { SuccessDto } from 'src/dto/success.dto'
import { User } from 'src/entities/user'
import { IUser } from 'src/types/entities/user.interface'
import { ILoginSuccessResData, ILoginSuccessResDto } from 'src/types/http/auth/login-by-password.interface'

class Sing {
  @ApiProperty({
    description: 'JWT 登录凭证',
  })
  access_token: string

  @ApiProperty({
    description: '过期时间戳',
  })
  expireAt: number
}

class LoginSuccessResData implements ILoginSuccessResData {
  @ApiProperty({ description: '登录凭证', type: () => Sing })
  sign: Sing

  @ApiProperty({ description: '用户信息', type: () => User })
  user: IUser
}

export class LoginSuccessResDto extends SuccessDto implements ILoginSuccessResDto {
  @ApiProperty({ type: () => LoginSuccessResData })
  data: LoginSuccessResData
}
