import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from '../user/user.service'
import { JwtAuthService } from '../jwt-auth/jwt-auth.service'
import { LessThan, Repository } from 'typeorm'
import { Login } from 'src/entities/login'
import { CodeService } from '../code/code.service'
import { Cron } from '@nestjs/schedule'
import { RegisterBodyDto } from './dto/register.body.dto'
import { responseError } from 'src/utils/response'
import { ErrorCode } from 'src/types/enum/error-code.enum'
import { CodeAction } from 'src/types/enum/code-action.enum'
import { objectOmit } from '@catsjuice/utils'
import { parseSqlError } from 'src/utils/response/sql-error/parse-sql-error'
import { User } from 'src/entities/user'
import { LoginByPasswordBodyDto } from './dto/login-by-password.body.dto'
import { comparePassword } from 'src/utils/encrypt/encrypt-password'

@Injectable()
export class AuthService {
  constructor(
    private readonly _codeSrv: CodeService,

    @InjectRepository(Login)
    private readonly _loginRepo: Repository<Login>,
    @Inject(forwardRef(() => UserService))
    private readonly _userSrv: UserService,
    @Inject(forwardRef(() => JwtAuthService))
    private readonly _jwtAuthSrv: JwtAuthService,
  ) { }

  @Cron('*/30 * * * * *')
  public async clearExpiredLogin() {
    await this._loginRepo.delete({
      expireAt: LessThan(new Date()),
    })
  }

  /**
   * 注册账号
   * @param body 
   * @param req 
   * @returns 
   */
  public async register(body: RegisterBodyDto, req: FastifyRequest) {
    // 校验 账号 是否被注册
    const user = await this._userSrv.qb().where('account = :account', { account: body.account }).getOne()
    if (user)
      responseError(ErrorCode.USER_ACCOUNT_REGISTERED)

    // 效验验证码
    const { bizId, code, ...userInfo } = body
    if (!(await this._codeSrv.verifyCaptcha(bizId, [req.raw.ip, code])))
      responseError(ErrorCode.AUTH_CODE_NOT_MATCHED)

    // 创建用户
    try {
      const user = await this._userSrv.createUser(userInfo)
      const sign = await this._jwtAuthSrv.signLoginAuthToken(user)
      return {
        sign,
        user: objectOmit(user, ['password'])
      }
    } catch (error) {
      const sqlError = parseSqlError(error)
      if (sqlError === SqlError.DUPLICATE_ENTRY)
        responseError(ErrorCode.USER_EXISTED, '账号已被注册')
      throw error
    }
  }

  /**
   * 账号/邮箱 登录
   * @param body 
   * @param req 
   * @param FastifyRequest 
   * @returns 
   */
  public async loginByPassword(body: LoginByPasswordBodyDto, req: FastifyRequest) {
    const { bizId, code, password, account, email } = body

    if (!account && !email) {
      throw new Error('账号或邮箱至少需要填写一个')
    }

    // 校验验证码
    if (!(await this._codeSrv.verifyCaptcha(bizId, [req.raw.ip, code])))
      responseError(ErrorCode.AUTH_CODE_NOT_MATCHED)

    const qb = this._userSrv.qb().addSelect('u.password')
    if (account)
      qb.where('account = :account', { account })
    else if (email)
      qb.where('email = :email', { email })

    const user = await qb.getOne()
    if (!user)
      responseError(ErrorCode.USER_ACCOUNT_NOT_REGISTERED)
    if (user.isDeleted)
      responseError(ErrorCode.USER_ACCOUNT_IS_DELETED)
    if (!user.password)
      responseError(ErrorCode.AUTH_PASSWORD_IS_NULL)

    const correct = await comparePassword(password, user.password)
    if (!correct)
      responseError(ErrorCode.AUTH_PASSWORD_NOT_MATCHED)

    return await this.signLoginTicket(user)
  }

  /**
  * 签发登录凭证
  * @param user
  * @returns
  */
  public async signLoginTicket(user: Partial<User>) {
    const sign = await this._jwtAuthSrv.signLoginAuthToken(user)
    return {
      sign,
      user: {
        ...user,
        password: !!user.password,
      },
    }
  }


  public qb(alias = 'l') {
    return this._loginRepo.createQueryBuilder(alias)
  }

  public repo() {
    return this._loginRepo
  }
}
