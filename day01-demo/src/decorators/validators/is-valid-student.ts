import { registerDecorator } from 'class-validator'
import type { ValidationOptions } from 'class-validator'
import { STUDENT_REQUIREMENTS_DESC, validateStudent } from 'src/utils/validator'

export function isValidStudent(value: any) {
  return !validateStudent(value)
}

export function IsValidStudent(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isValidStudent',
      target: object.constructor,
      propertyName,
      options: {
        message: `账号不符合要求，${STUDENT_REQUIREMENTS_DESC}`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return isValidStudent(value)
        },
      },
    })
  }
}
