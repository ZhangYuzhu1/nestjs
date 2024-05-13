import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { map, Observable } from 'rxjs'

interface Data<T> {
  data: T
}

/**响应拦截器，规定返回类型给前端 */
@Injectable()
export class ResponseStrategy<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(map(data => {
      return {
        data,
        status: 0,
        message: 'success'
      }
    }))
  }
}