export const STUDENT_MAX_LENGTH = 20
export const STUDENT_MIN_LENGTH = 10
export const STUDENT_REQUIREMENTS_DESC = `学号为${STUDENT_MIN_LENGTH}-${STUDENT_MAX_LENGTH}位，必须为数字`

/**
 * 校验一个学号是否符合要求
 * @param student 待校验的学号
 * @returns 如果符合要求，返回空字符串，否则返回错误信息
 */
export function validateStudent(student: string) {
  if (!/^\d+$/.test(student))
    return '学号必须为数字'
  if (student.length < STUDENT_MIN_LENGTH)
    return `学号长度不得小于 ${STUDENT_MIN_LENGTH}`
  if (student.length > STUDENT_MAX_LENGTH)
    return `学号长度不得大于 ${STUDENT_MAX_LENGTH}`

  return ''
}
