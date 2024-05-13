import type { IBasicResponse } from '../../http/basic.interface'
import type { IQueryPagination } from './pagination.interface'
import type { IQueryFilter } from './filter.interface'
import type { IQuerySort } from './sort.interface'
import type { IQueryRelation } from './relation.interface'

/**
 * 通用的分页查询
 * 请求参数
 */
export interface IQueryDto<Entity> {
  /** 分页信息 */
  pagination?: IQueryPagination
  /** 过滤条件 */
  filters?: IQueryFilter<Entity>[]
  /** 排序信息 */
  sort?: IQuerySort<Entity>[]
  /** 关联信息 */
  relations?: IQueryRelation<Entity>
}

export interface IQueryResData<Entity> {
  /** 当前页数 */
  page: number
  /** 每页的数量 */
  pageSize: number
  /** 数据总数 */
  total: number
  /** 数据列表 */
  data: Entity[]
}

/**
 * 通用的分页查询
 * 响应数据
 */
export interface IQueryResDto<Entity>
  extends IBasicResponse<IQueryResData<Entity>> {}
