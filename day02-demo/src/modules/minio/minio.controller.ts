import { Body, Controller, Post } from '@nestjs/common';
import { MinioService } from './minio.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('minio')
@ApiTags('Minio | 文件服务')
export class MinioController {
  constructor(
    private readonly minioService: MinioService
  ) { }

  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { 'file': { type: 'string', format: 'binary' } },
    }
  })
  @Post('upload')
  public async uploadFile(@Body() body: any) {
    return this.minioService.uploadFile(body.file.filename, await body.file.toBuffer());
  }
}
