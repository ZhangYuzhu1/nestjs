import { Mixin } from 'ts-mixer'
import { CodeActionDto } from 'src/dto/code-action.dto'
import { EmailDto } from 'src/dto/emit.dto'
import { ISendEmailCodeBodyDto } from 'src/types/http/email/send-email-code.interface'

export class SendEmailCodeBodyDto
  extends Mixin(EmailDto, CodeActionDto)
  implements ISendEmailCodeBodyDto { }