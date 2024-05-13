import { UpdateUserBodyDto } from './update-user.body.dto'
import { ICreateUserBodyDto } from 'src/types/http/user/create-user.interface'

export class CreateUserBodyDto
  extends UpdateUserBodyDto
  implements ICreateUserBodyDto {
}
