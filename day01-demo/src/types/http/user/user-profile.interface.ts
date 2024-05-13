import type { IBasicResponse } from '../basic.interface'
import type { User } from 'src/entities/user'

/**
 * 查询当前登录用户的信息
 * 响应数据
 */
export interface IUserProfileResDto extends IBasicResponse<User> { }
