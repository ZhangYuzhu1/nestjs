import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { HasPermission } from 'src/guards/permission.guard'
import { CatService } from './cat.service'
import { CatBodyDto } from './dto/cat-body-dot'
import { CatIdDto } from './dto/cat-id-dto'
import { PermissionType } from 'src/types/enum/permission.enum'
import { AdoptCatBody } from './dto/adopt-cat-body'
import { UserService } from '../user/user.service'

@Controller('cat')
@ApiTags('cat')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: '添加一只猫咪' })
  @HasPermission([PermissionType.CAT_CREATE])
  @Post()
  public create(@Body() body: CatBodyDto) {
    return this.catService.create(body)
  }

  @ApiOperation({ summary: '获取所有猫咪' })
  @HasPermission([PermissionType.CAT_QUERY])
  @Get()
  public async findAll() {
    return await this.catService.repo().find()
  }

  @ApiOperation({ summary: '获取一只猫咪' })
  @HasPermission([PermissionType.CAT_QUERY])
  @Get(':id')
  public async findOne(@Param() param: CatIdDto) {
    const { id } = param
    const cat = await this.catService.repo().findOne({ where: { id } })
    if (!cat) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '🤷‍🐱',
      }, HttpStatus.BAD_REQUEST)
    }
    return cat
  }

  @ApiOperation({ summary: '修改猫咪' })
  @HasPermission([PermissionType.CAT_UPDATE])
  @Put(':id')
  public async update(
    @Param() param: CatIdDto,
    @Body() body: CatBodyDto,
  ) {
    const { id } = param
    const cat = await this.catService.repo().findOne({ where: { id } })
    if (!cat) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '🤷‍🐱',
      }, HttpStatus.BAD_REQUEST)
    }
    return this.catService.update(body, id)
  }

  @ApiOperation({ summary: '删除猫咪' })
  @HasPermission([PermissionType.CAT_DELETE])
  @Delete(':id')
  public async remove(@Param() param: CatIdDto) {
    const { id } = param
    const cat = await this.catService.repo().findOne({ where: { id } })
    if (!cat) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '🤷‍🐱',
      }, HttpStatus.BAD_REQUEST)
    }
    const removeCat = await this.catService.repo().delete(id)
    return removeCat.affected
  }

  @ApiOperation({ summary: '领养猫咪' })
  @HasPermission([PermissionType.CAT_UPDATE])
  @Patch(':userId/adopt/:catId')
  public async adopt(@Body() body: AdoptCatBody) {
    const { userId, catId } = body
    if (!userId || !catId)
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '参数错误',
      }, HttpStatus.BAD_REQUEST)

    const cat = await this.catService.repo().findOne({ where: { id: catId }, relations: { user: true } })
    if (!cat)
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '猫咪不存在',
      }, HttpStatus.BAD_REQUEST)
    if (cat.userId)
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '猫咪已领养',
      }, HttpStatus.BAD_REQUEST)

    const user = await this.userService.repo().findOne({ where: { id: userId } })
    if (!user)
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '用户不存在',
      }, HttpStatus.BAD_REQUEST)

    return await this.catService.repo().update(catId, { userId })
  }
}
