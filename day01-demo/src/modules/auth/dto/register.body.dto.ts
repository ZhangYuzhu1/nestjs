import { AccountDto } from 'src/dto/account.dto';
import { CodeVerifyDto } from 'src/dto/code-verify.dto';
import { EmailOptionalDto } from 'src/dto/emit.dto';
import { PasswordDto } from 'src/dto/password.dto';
import { IRegisterBodyDto } from 'src/types/http/auth/register.interface';
import { Mixin } from 'ts-mixer'

export class RegisterBodyDto
  extends Mixin(
    AccountDto,
    PasswordDto,
    EmailOptionalDto,
    CodeVerifyDto,
  )
  implements IRegisterBodyDto { }