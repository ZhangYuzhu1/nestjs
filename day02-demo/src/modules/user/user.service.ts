import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRep: Repository<User>,
  ) { }

  public async findAll() {
    return 'findAll'
  }

  public qb(a = 'u') {
    return this._userRep.createQueryBuilder(a)
  }

  public repo() {
    return this._userRep
  }
}
