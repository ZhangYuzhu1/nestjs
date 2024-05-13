export interface IStudentDto {
  /** 用于登录的学号 */
  student: number
}

export interface IStudentOptionalDto extends Partial<IStudentDto> {}
