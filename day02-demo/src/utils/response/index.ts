import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

/**
 * Swagger Api 响应错误修饰器
 */
export function ApiErrorResponse(...message: string[]) {
  return applyDecorators(
    ...message.map((message) => {
      return ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: message,
      })
    }),
  )
}
