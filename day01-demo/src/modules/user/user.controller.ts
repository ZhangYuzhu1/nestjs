import { Controller, Body, Put, Get, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { PermissionType } from 'src/types/enum/permission.enum';
import { HasPermission } from 'src/guards/permission.guard';
import { CreateUserBodyDto } from './dto/create-user-body.dto';
import { Throttle } from '@nestjs/throttler';
import { UserIdDto } from 'src/dto/id/user.dto';
import { UpdateUserBodyDto } from './dto/update-user.body.dto';
import { ApiSuccessResponse, responseError } from 'src/utils/response';
import { ErrorCode } from 'src/types/enum/error-code.enum';
import { parseSqlError } from 'src/utils/response/sql-error/parse-sql-error';
import { UserProfileResponseDto } from './dto/user.rs.dto';

@ApiTags('User | 用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly _userSrv: UserService
  ) { }

  @ApiOperation({ summary: '创建一个新用户' })
  @Throttle(10000, 60)
  @HasPermission(PermissionType.USER_CREATE)
  @Put('user/list')
  public async createUser(@Body() body: CreateUserBodyDto) {
    const { account, email, phone, password, isDeleted } = body
    const user = await this._userSrv.createUser({ account, email, phone, password, isDeleted })
    return user
  }

  @ApiOperation({ summary: '获取用户列表' })
  @HasPermission(PermissionType.USER_QUERY)
  @Get('')
  public async getUserList() {
    const userList = await this._userSrv.repo().find()
    return userList
  }

  @ApiOperation({ summary: '修改指定用户的信息' })
  @HasPermission(PermissionType.USER_UPDATE)
  @Patch(':userId')
  public async updateUser(
    @Param() param: UserIdDto,
    @Body() body: UpdateUserBodyDto
  ) {
    const { email, phone, password, isDeleted } = body
    const { userId } = param

    const user = await this._userSrv.repo().findOne({ where: { id: userId } })
    if (!user)
      responseError(ErrorCode.USER_NOT_FOUND)

    try {
      await this._userSrv.repo().update({ id: userId }, { email, phone, password, isDeleted })
    } catch (err) {
      const error = parseSqlError(err)
      if (error === SqlError.DUPLICATE_ENTRY) {
        const value = err.message.match(/Duplicate entry\s+'(.*?)'/)?.[1]
        if (value === email)
          responseError(ErrorCode.USER_EMAIL_REGISTERED)
        else if (value === phone)
          responseError(ErrorCode.USER_PHONE_NUMBER_REGISTERED)
      }
      throw err
    }
    return true
  }

  @ApiOperation({ summary: '获取当前登录用户的信息' })
  @ApiSuccessResponse(UserProfileResponseDto)
  @Get('profile/own')
  public async getOwnProfile(@Param() param: UserIdDto) {
    return await this._userSrv.repo().findOne({ where: { id: param.userId } })
  }
}
