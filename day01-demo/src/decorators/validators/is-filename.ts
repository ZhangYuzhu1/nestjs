import { registerDecorator } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

export function isFilename(value: any) {
  if (value.includes('/'))
    return false

  if (value.includes('\\'))
    return false

  if (value.includes(':'))
    return false

  if (value.includes('*'))
    return false

  if (value.includes('?'))
    return false

  if (value.includes('"'))
    return false

  if (value.includes('<'))
    return false

  if (value.includes('>'))
    return false

  if (value.includes('|'))
    return false

  // 必须包含后缀
  if (!value.includes('.'))
    return false

  return true
}

export function IsFilename(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isFilename',
      target: object.constructor,
      propertyName,
      options: {
        message: '文件名不符合要求',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return isFilename(value)
        },
      },
    })
  }
}
