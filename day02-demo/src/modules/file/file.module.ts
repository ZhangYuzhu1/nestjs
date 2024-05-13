import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { OssService } from './oss/oss.service';

@Module({
  controllers: [FileController],
  providers: [FileService, OssService],
})
export class FileModule { }
