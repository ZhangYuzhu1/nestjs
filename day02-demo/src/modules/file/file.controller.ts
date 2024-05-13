import { Body, Controller, Get, Post } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OssService } from './oss/oss.service';

@Controller('file')
@ApiTags('文件上传')
export class FileController {
  constructor(
    private readonly _fileSrv: FileService
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
  public async upload(@Body() body: any) {
    return this._fileSrv.upload(body.file.filename, await body.file.toBuffer());
  }

}
