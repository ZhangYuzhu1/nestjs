import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user'
import { Repository } from 'typeorm'

import { Cat } from 'src/entities/cat'
import { UserService } from '../user/user.service'
import { JwtAuthService } from '../jwt-auth/jwt-auth.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _user: Repository<User>,
    @InjectRepository(Cat)
    private readonly _cat: Repository<Cat>,

    private readonly _userSrv: UserService,
    private readonly _jwtAuthSrv: JwtAuthService,
  ) { }

  /**
   * 注册
   * @param body
   * @returns
   */
  public async register(body: Partial<User>) {
    try {
      const res = await this._user.find({ where: { account: body.account } })
      if (res.length)
        throw new Error('用户已存在')
      await this._user.save(body)
      return {
        ...body,
        password: !!body.password,
      }
    }
    catch (error) {
      return {
        code: 1,
        message: error.message,
      }
    }
  }

  public async login(body: Partial<User>) {
    const { account, password } = body
    const user = await this._userSrv.qb().where('account=:account', { account }).addSelect('u.password').getOne()
    if (!user) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: '用户不存在',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
    if (password !== user.password) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: '密码错误',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
    const sign = await this._jwtAuthSrv.signLoginAuthToken(user)
    return {
      sign,
      user: {
        ...user,
        password: !!user.password,
      },
    }
  }
}
