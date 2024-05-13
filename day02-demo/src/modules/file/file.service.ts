import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OssService } from './oss/oss.service';

@Injectable()
export class FileService {

  constructor(
    private readonly _cfgSrv: ConfigService,
    private readonly _ossSrv: OssService
  ) { }

  /**上传文件 */
  public async upload(name: string, file: string) {
    const directory = 'avatar'
    return await this._ossSrv.client.put(`${directory}/${name}`, file)
  }

}
