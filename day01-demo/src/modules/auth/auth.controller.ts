import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common'
import * as svgCaptcha from 'svg-captcha'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'

import { ApiErrorResponse, ApiSuccessResponse } from 'src/utils/response'
import { ErrorCode } from 'src/types/enum/error-code.enum'
import { AuthService } from './auth.service'
import { LoginSuccessResDto } from './dto/login-success.res.dto'
import { RegisterBodyDto } from './dto/register.body.dto'
import { CodeService } from '../code/code.service'
import { JwtAuthService } from '../jwt-auth/jwt-auth.service'
import { LoginByPasswordBodyDto } from './dto/login-by-password.body.dto'

@ApiTags('Auth | 身份验证')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authSrv: AuthService,
    private readonly _codeSrv: CodeService,
    private readonly _jwtAuthSrv: JwtAuthService,
  ) { }

  @ApiOperation({ summary: '通过 账号/邮箱+密码 登录' })
  @ApiSuccessResponse(LoginSuccessResDto)
  @Post('login/password')
  public async loginByPassword(@Body() body: LoginByPasswordBodyDto, @Req() req: FastifyRequest) {
    return await this._authSrv.loginByPassword(body, req)
  }

  @ApiOperation({ summary: '注册 (账号+验证码)' })
  @ApiSuccessResponse(LoginSuccessResDto)
  @ApiErrorResponse(ErrorCode.AUTH_CODE_NOT_MATCHED)
  @Put('register')
  public async register(@Body() body: RegisterBodyDto, @Req() req: FastifyRequest) {
    return await this._authSrv.register(body, req)
  }

  @Throttle(1, 1)
  @ApiOperation({ summary: '获取图形验证码' })
  @Get('captcha')
  public async getCaptcha(@Req() req: FastifyRequest) {
    const ip = req.raw.ip

    const captcha = svgCaptcha.create({
      size: 6,
      width: 144,
      height: 48,
      noise: 3,
      fontSize: 48,
      ignoreChars: 'lI',
    })

    const { bizId } = await this._codeSrv.createCaptcha(ip, captcha.text)
    return {
      bizId,
      img: captcha.data,
      text: captcha.text,
    }
  }

  @ApiOperation({ summary: '登出' })
  @Post('logout')
  public async logout(@Req() req: FastifyRequest) {
    await this._jwtAuthSrv.destroyLoginAuthToken(req.raw.token)
    return true
  }
}
