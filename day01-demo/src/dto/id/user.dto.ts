import { decorate } from "ts-mixer";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IUserIdDto, IUserIdOptionalDto } from "src/types/dto/id/user.interface";
import { GenerateParamsDecorator } from "src/utils/params-decorator-gen";

function Decorator(optional = false) {
  return GenerateParamsDecorator([
    ApiProperty({
      description: '用户的唯一标识',
      type: () => String,
      example: '00000000-0000-0000-0000-000000000000',
    }),
    IsString(),
  ], optional)
}

export class UserIdDto implements IUserIdDto {
  @decorate(Decorator(false))
  userId: string;
}

export class UserIdOptionDto implements IUserIdOptionalDto {
  @decorate(Decorator(false))
  userId?: UserIdDto['userId']
}