import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { HttpException, HttpStatus, Injectable, UseGuards, applyDecorators } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ApiBearerAuth } from '@nestjs/swagger'
import { ApiErrorResponse } from 'src/utils/response'

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    public readonly reflector: Reflector,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest()

    const loginRequired = this.getReflectorValue<boolean>(
      this.reflector,
      context,
      'loginRequired',
      true,
    )

    if (!request.raw.user && loginRequired) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: request.raw.accessTokenExpired ? '登录过期' : '用户未登录',
      }, HttpStatus.BAD_REQUEST)
    }

    return !!request.raw.user
  }

  public getReflectorValue<T>(
    reflector: Reflector,
    context: ExecutionContext,
    key: string,
    defaultValue: T) {
    return reflector.get<T>(key, context.getHandler())
      ?? reflector.get<T>(key, context.getClass())
      ?? defaultValue
  }
}

/** 判断用户是否登录 */
export function IsLogin() {
  return applyDecorators(
    UseGuards(LoginGuard),
    IsLoginApis(),
  )
}

export function IsLoginApis() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiErrorResponse('登录过期', '用户未登录'),
  )
}
