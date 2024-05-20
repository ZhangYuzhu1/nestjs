import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly client: Minio.Client

  constructor(
    private readonly _cfgSrc: ConfigService
  ) {
    this.client = new Minio.Client(this._cfgSrc.get('minio'))
  }

  public async uploadFile(fileName: string, file: Buffer) {
    return await this.client.putObject('demo', fileName, file)
  }
}
