import { Module, forwardRef } from '@nestjs/common'

import { CodeModule } from '../code/code.module'
import { UserModule } from '../user/user.module'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'

@Module({
  imports: [
    forwardRef(() => UserModule),
    CodeModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
