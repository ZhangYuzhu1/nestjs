import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/entities/role';


export class RoleIdDto {
  @ApiProperty({
    description: '管理角色的唯一标识',
    type: () => String,
    example: 'root',
  })
  roleId: Role['id']
}
