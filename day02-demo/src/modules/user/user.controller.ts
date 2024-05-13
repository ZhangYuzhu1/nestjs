import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { HasPermission } from 'src/guards/permission.guard'
import { PermissionType } from 'src/types/enum/permission.enum'
import { CatIdDto } from './dto/user-id-dto'

@Controller('user')
@ApiTags('User | 用户')
export class UserController {
  constructor(
    private readonly _userSrv: UserService,
  ) { }

  @ApiOperation({ summary: '获取用户列表' })
  @HasPermission([PermissionType.USER_QUERY])
  @Get()
  public async findAll() {
    return await this._userSrv.repo().find({ relations: { cats: true } })
  }

  @ApiOperation({ summary: '获取一个用户' })
  @HasPermission([PermissionType.USER_QUERY])
  @Get(':id')
  public async findOne(@Param() param: CatIdDto) {
    return await this._userSrv.repo().findOne({ where: { id: param.id }, relations: { cats: true } })
  }
}
