import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response, Request } from 'express'

/**异常拦截器 */
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()
    const status = exception.getStatus()
    console.log(exception);

    res.status(status).json({
      status,
      time: new Date().toISOString(),
      message: exception.message,
      path: req.url,
    })
  }
}