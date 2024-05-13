import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import type { User } from 'src/entities/user'

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly _jwtSrv: JwtService,
    private readonly _cfgSrv: ConfigService,
  ) { }

  /** 发放token */
  public async signLoginAuthToken(user: Partial<User>) {
    const expiresIn = this._cfgSrv.get<number>('jwt.loginAuthExpireInSeconds')
    const secret = this._cfgSrv.get<string>('jwt.loginAuthSecret')
    const signObj = {
      id: user.id,
      account: user.account,
      timestamp: Date.now(),
    }

    const access_token = this._jwtSrv.sign(signObj, { secret, expiresIn })

    return { access_token, expireAt: Date.now() + expiresIn }
  }

  /** 校验token */
  public async validateLoginAuthToken(token: string) {
    return this._jwtSrv.verifyAsync(token, {
      secret: this._cfgSrv.get<string>('jwt.loginAuthSecret'),
    })
  }
}
