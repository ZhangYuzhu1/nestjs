import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository, In, Not } from 'typeorm'
import { encryptPassword } from 'src/utils/encrypt/encrypt-password'
import { SysAdmin } from 'src/config/_sa.config'
import { User } from 'src/entities/user'
import { parseSqlError } from 'src/utils/response/sql-error/parse-sql-error'
import { ErrorCode } from 'src/types/enum/error-code.enum'
import { responseError } from 'src/utils/response'
import { log } from 'console'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    private readonly _cfgSrv: ConfigService,
  ) { }

  onModuleInit() {
    this.initSysAdmin()
  }

  /**
   * 初始化系统管理员
   */
  public async initSysAdmin() {
    const superAdminList = this._cfgSrv.get<SysAdmin[]>('sa.list')

    // 删除无效的超级管理员
    await this._userRepo.delete({
      isSysAdmin: true,
      account: Not(In(superAdminList.map(sa => sa.account))),
    })

    // 添加新的超级管理员
    for (const sa of superAdminList) {
      try {
        await this._userRepo.save({
          account: sa.account,
          password: await encryptPassword(sa.password),
          email: '123456@123.com',
          isSysAdmin: true,
        })
      }
      catch (e) {
        await this._userRepo.update(
          { account: sa.account },
          {
            password: await encryptPassword(sa.password),
            email: '123456@123.com',
            isSysAdmin: true,
          },
        )
      }
    }
  }

  /**
   * 创建用户
   * @param user 
   * @returns 
   */
  public async createUser(user: Partial<User>) {
    const qr = this._userRepo.manager.connection.createQueryRunner()
    await qr.connect()
    await qr.startTransaction()
    try {
      const newUser = await qr.manager.save(
        this._userRepo.create({
          ...user,
          password: user.password ? await encryptPassword(user.password) : null,
        })
      )
      await qr.commitTransaction()
      return newUser
    } catch (error) {
      await qr.rollbackTransaction()
      const err = parseSqlError(error)
      if (err === SqlError.DUPLICATE_ENTRY) {
        const value = error.message.match(/Duplicate entry\s+'(.*?)'/)?.[1]
        if (value === user.account)
          responseError(ErrorCode.USER_ACCOUNT_REGISTERED)
        else if (value === user.email)
          responseError(ErrorCode.USER_EMAIL_REGISTERED)
        else if (value === user.phone)
          responseError(ErrorCode.USER_PHONE_NUMBER_REGISTERED)
      }
      throw error
    }
  }

  public qb(alias = 'u') {
    return this._userRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._userRepo
  }
}
