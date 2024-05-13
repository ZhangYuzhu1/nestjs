import type { NestMiddleware } from '@nestjs/common'
import { Injectable, Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import type { NextFunction, Response } from 'express'
import type { User } from 'src/entities/user'
import { JwtAuthService } from 'src/modules/jwt-auth/jwt-auth.service'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name)

  constructor(
    private readonly _modRef: ModuleRef,
  ) { }

  async use(req: FastifyRequest, res: Response, next: NextFunction) {
    let query
    try {
      query = req.url
        .split('?')
        .pop()
        .split('&')
        .reduce((dict, curr) => {
          const [key, value] = curr.split('=')
          dict[key] = value
          return dict
        }, {})
    }
    catch (_) { }

    const authHeader = (req?.headers as any)?.authorization
    const access_token = this._readTokenFromBearAuthHeader(authHeader) || query.token

    if (!access_token) {
      next()
      return
    }
    req.token = access_token

    const _jwtAuthSrv = this._modRef.get(JwtAuthService, { strict: false })
    const _userSrv = this._modRef.get(UserService, { strict: false })
    let info, user: User

    try {
      info = await _jwtAuthSrv.validateLoginAuthToken(access_token)
    }
    catch (error) {
      req.accessTokenExpired = true
      this.logger.error('解析 access_token 时出现错误', error)
    }
    try {
      const userId = info.id
      user = await _userSrv.qb()
        .where('u.id=:id', { id: userId })
        .addSelect('u.password')
        .getOne()
    }
    catch (error) {
      this.logger.error('获取用户信息时出现错误', error)
    }
    if (!user)
      return next()

    // 比较数据库内的用户账号与token中解析出的账号是否一致
    if (info.account && info.account === user.account) {
      req.user = user
    }
    else {
      req.accessTokenExpired = true
      this.logger.warn(
        `User[${info?.id}]'s account in db[${user.account}] not match account in token[${info.account}]`,
      )
    }

    next()
  }

  private _readTokenFromBearAuthHeader(authHeader: string): string {
    return authHeader && authHeader.replace(/^Bearer\s(\S*)$/, '$1')
  }
}
