import { decorate } from 'ts-mixer'
import { ApiProperty } from '@nestjs/swagger'
import { MaxLength, MinLength } from 'class-validator'
import { GenerateParamsDecorator } from 'src/utils/params-decorator-gen'
import { IsValidEmail } from 'src/decorators/validators/is-valid-email'
import { EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH } from 'src/utils/validator'
import { IEmailDto, IEmailOptionalDto } from './email.interface'

function Decorator(optional = false) {
  return GenerateParamsDecorator(
    [
      ApiProperty({
        description: '邮箱',
        maxLength: EMAIL_MAX_LENGTH,
        minLength: EMAIL_MIN_LENGTH,
        type: () => String,
        example: 'cats_juice@outlook.com',
      }),
      MinLength(EMAIL_MIN_LENGTH, { message: `邮箱长度不能小于${EMAIL_MIN_LENGTH}` }),
      MaxLength(EMAIL_MAX_LENGTH, { message: `邮箱长度不能大于${EMAIL_MAX_LENGTH}` }),
      IsValidEmail(),
    ],
    optional,
  )
}

export class EmailDto implements IEmailDto {
  @decorate(Decorator())
  email: string
}

export class EmailOptionalDto implements IEmailOptionalDto {
  @decorate(Decorator(true))
  email?: string
}
