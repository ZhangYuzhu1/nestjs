import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Cat } from 'src/entities/cat'
import { InjectRepository } from '@nestjs/typeorm'
import { Cron } from '@nestjs/schedule'

import { EmailService } from '../email/email.service'
import type { CatBodyDto } from './dto/cat-body-dot'

@Injectable()
export class CatService {
  private readonly logger = new Logger(CatService.name)

  constructor(
    @InjectRepository(Cat)
    private readonly _catRep: Repository<Cat>,
    private readonly _emailSrv: EmailService,
  ) { }

  public async create(cat: CatBodyDto) {
    if (await this._catRep.findOne({ where: { name: cat.name } })) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '🐱已存在',
      },
        HttpStatus.BAD_REQUEST,
      )
    }
    return await this._catRep.save(cat)
  }

  public async update(body: CatBodyDto, id: string) {
    const newCat = await this.repo().update(id, { ...body })
    return newCat.affected
  }

  // @Cron('* * * * * *')
  // public test() {
  //   this.logger.debug('定时任务执行了')
  //   this._emailSrv.sendEmail({
  //     to: 'zhangyuzhu0177@163.com',
  //     subject: 'Hello ✔',
  //     html: 'Hello Word!',
  //   })
  // }

  public repo() {
    return this._catRep
  }
}
