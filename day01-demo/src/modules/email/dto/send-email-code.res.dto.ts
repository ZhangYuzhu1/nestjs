import { ApiProperty } from '@nestjs/swagger'
import { SuccessDto } from 'src/dto/success.dto'
import { ISendEmailCodeResData, ISendEmailCodeResDto } from 'src/types/http/email/send-email-code.interface'

export class SendEmailCodeResData implements ISendEmailCodeResData {
  @ApiProperty({
    description: '发送到邮箱的验证码的唯一标识',
  })
  bizId: string
}

export class SendEmailCodeResDto extends SuccessDto implements ISendEmailCodeResDto {
  @ApiProperty({ type: () => SendEmailCodeResData })
  data: SendEmailCodeResData
}
