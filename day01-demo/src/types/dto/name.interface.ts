export interface INameDto {
  /** 用户姓名 */
  name: string
}

export interface INameOptionalDto extends Partial<INameDto> {}
