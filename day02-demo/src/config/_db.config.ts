import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { registerAs } from '@nestjs/config'
import { User } from 'src/entities/user'
import { Role } from 'src/entities/role'
import { Permission } from 'src/entities/permission'

export default registerAs('db', () => {
  return <TypeOrmModuleOptions>{
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'rootroot',
    database: 'nest_demo',
    synchronize: true,
    // 自动加载实体
    autoLoadEntities: true,
    entities: [User, Role, Permission],
  }
})
