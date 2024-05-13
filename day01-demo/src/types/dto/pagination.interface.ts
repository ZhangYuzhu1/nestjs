export interface IPaginationDto {
  /** 查询的页码 */
  page?: number
  /** 每页的数量 */
  pageSize?: number
}

export interface IPaginatedResData<T> {
  /** 当前页数 */
  page: number
  /** 每页的数量 */
  pageSize: number
  /** 数据总数 */
  total: number
  /** 数据列表 */
  data: T[]
}
