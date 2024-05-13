import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Request } from 'express'
import { IS_PUBLIC_KEY } from 'src/modules/auth/auth.public'
import { JwtAuthService } from 'src/modules/jwt-auth/jwt-auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _jwtAuthSrv: JwtAuthService,
    private readonly reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token)
      throw new UnauthorizedException()
    try {
      const payload = this._jwtAuthSrv.validateLoginAuthToken(token)
      // eslint-disable-next-line dot-notation
      request['user'] = payload
    }
    catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
