import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { EmailService } from './email.service'
import { EmailDto } from './dto/email-dto'

@Controller('email')
@ApiTags('邮件服务')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @ApiOperation({ summary: '发送邮件' })
  @Post()
  public sendEmail(@Body() body: EmailDto) {
    return this.emailService.sendEmail({
      to: body.email,
      subject: 'Hello',
      html: '<h1>Hello World!!!</h1>',
      // text: '测试邮件内容',
    })
  }
}
