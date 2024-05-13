import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBodyDto } from './create-user-body.dto';

export class UpdateUserDto extends PartialType(CreateUserBodyDto) { }
