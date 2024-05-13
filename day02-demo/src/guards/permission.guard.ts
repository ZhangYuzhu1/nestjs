import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { HttpException, HttpStatus, Injectable, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RoleService } from 'src/modules/role/role.service'
import type { PermissionType } from 'src/types/enum/permission.enum'
import { ApiErrorResponse } from 'src/utils/response'
import { IsLoginApis, LoginGuard } from './login.guard'

type PermissionRelation = 'OR' | 'AND'

@Injectable()
export class PermissionGuard extends LoginGuard implements CanActivate {
  constructor(
    private readonly _roleSrv: RoleService,
    public readonly reflector: Reflector,
  ) {
    super(reflector)
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest()
    const loginRequired = this.getReflectorValue<boolean>(
      this.reflector,
      context,
      'loginRequired',
      true,
    )

    const login = await super.canActivate(context)
    if (!login && loginRequired) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '用户未登录'
      }, HttpStatus.BAD_REQUEST)
    }

    const requiredPermissions = this.getReflectorValue<PermissionType[]>(
      this.reflector,
      context,
      'permissions',
      [],
    )
    const permissionsRelation = this.getReflectorValue<PermissionRelation>(
      this.reflector,
      context,
      'relation',
      'OR',
    )


    return await this.validatePermission(request, requiredPermissions, permissionsRelation)
  }

  public async validatePermission(
    req: FastifyRequest,
    requiredPermissions: PermissionType[],
    permissionsRelation: PermissionRelation,
  ) {
    const user = req.raw.user

    const role = user.roleId
      ? await this._roleSrv.repo().findOne({
        where: { id: user.roleId },
        relations: { permissions: true }
      })
      : null

    req.raw.user && (req.raw.user.role = role)

    if (!requiredPermissions.length)
      return true

    const hasPermission = role?.permissions?.length
      ? requiredPermissions[permissionsRelation === 'OR' ? 'some' : 'every'](
        permission => role.permissions.some(p => p.name === permission),
      )
      : false
    if (!hasPermission)
      throw new HttpException({
        code: HttpStatus.FORBIDDEN,
        message: '没有权限'
      }, HttpStatus.FORBIDDEN)

    return true
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

export function HasPermission(
  permission: PermissionType[] | PermissionType = [],
  relation: PermissionRelation = 'OR',
  loginRequired = true,
) {
  if (!Array.isArray(permission))
    permission = [permission]
  return applyDecorators(
    IsLoginApis(),
    UseGuards(PermissionGuard),
    SetMetadata('permissions', permission),
    SetMetadata('relation', relation),
    SetMetadata('loginRequired', loginRequired),
    ApiErrorResponse('没有权限'),
  )
}
