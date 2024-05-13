export type IQueryFilter<Entity> = {
  field: keyof Entity | string
} & (
  {
    type: '=' | '!=' | '>' | '<' | '>=' | '<='
    value: any
  } | {
    type: 'BETWEEN'
    value: [any, any]
  } | {
    type: 'IS NULL' | 'IS NOT NULL'
  } | {
    type: 'IN' | 'NOT IN'
    value: any[]
  } | {
    type: 'LIKE' | 'NOT LIKE'
    value: string
  }
)
