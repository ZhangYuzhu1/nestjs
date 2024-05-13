import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { Injectable, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ICodeVerifyDto } from 'src/dto/code-verify.interface'
import { IEmailDto } from 'src/dto/email.interface'
import { CodeService } from 'src/modules/code/code.service'
import { CodeAction } from 'src/types/enum/code-action.enum'
import { ErrorCode } from 'src/types/enum/error-code.enum'
import { ApiErrorResponse } from 'src/utils/response'
import { getReflectorValue } from 'src/utils/validator/reflector-value'

interface BasicBody extends ICodeVerifyDto, IEmailDto { }

@Injectable()
export class EmailCodeVerifyGuard implements CanActivate {
  constructor(
    public readonly reflector: Reflector,
    public readonly codeSrv: CodeService,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: FastifyRequest = context.switchToHttp().getRequest()
    const action = getReflectorValue<CodeAction>(this.reflector, context, 'action', null)

    const body = req.body as any as BasicBody

    if (!action)
      throw new Error('action is required')

    await this.codeSrv.verifyWithError(body.bizId, [body.email, action, body.code])

    return true
  }
}
/**
 * 校验验证码是否正确
 * @param action
 * @returns
 */
export function EmailCodeVerify(action: CodeAction) {
  return applyDecorators(
    UseGuards(EmailCodeVerifyGuard),
    SetMetadata('action', action),
    ApiErrorResponse(ErrorCode.AUTH_CODE_NOT_MATCHED),
  )
}
