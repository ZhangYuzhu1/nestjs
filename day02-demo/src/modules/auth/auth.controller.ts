import { Body, Controller, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('auth')
@ApiTags('Auth | 授权')
export class AuthController {
  constructor(private readonly _authSrv: AuthService) { }

  @ApiOperation({ summary: '注册(账号 + 密码)' })
  @Put('register')
  public async register(@Body() body: CreateUserDto) {
    return this._authSrv.register(body)
  }

  @ApiOperation({ summary: '登录(账号+密码)' })
  @Post('login')
  public async login(@Body() body: CreateUserDto) {
    return this._authSrv.login(body)
  }
}
