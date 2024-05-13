import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cat } from 'src/entities/cat'
import { EmailModule } from '../email/email.module'
import { CatService } from './cat.service'
import { CatController } from './cat.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    EmailModule,
    UserModule,

    TypeOrmModule.forFeature([Cat]),
  ],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule { }
