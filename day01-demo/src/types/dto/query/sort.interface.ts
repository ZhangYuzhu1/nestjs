export interface IQuerySort<Entity> {
  field: keyof Entity
  order: 'ASC' | 'DESC'
}
