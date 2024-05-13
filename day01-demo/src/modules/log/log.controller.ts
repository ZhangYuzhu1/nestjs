import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { LogService } from './log.service'

@ApiTags('Log | 日志服务')
@Controller('log')
export class LogController {
  constructor(
    private readonly _logSrv: LogService,
  ) {}
}
