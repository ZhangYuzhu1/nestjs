import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as OSS from 'ali-oss'

@Injectable()
export class OssService {
  public client: OSS

  constructor(
    private readonly _cfgSrv: ConfigService
  ) {
    this.client = new OSS(this._cfgSrv.get('oss'))
  }

  /** 创建存储空间 */
  // private async putBucket() {
  //   try {
  //     const options = {
  //       storageClass: 'Archive', // 存储空间的默认存储类型为标准存储，即Standard。如果需要设置存储空间的存储类型为归档存储，请替换为Archive。
  //       acl: 'public-read', // 存储空间的默认读写权限为私有，即private。如果需要设置存储空间的读写权限为公共读，请替换为public-read。
  //       dataRedundancyType: 'ZRS' // 存储空间的默认数据容灾类型为本地冗余存储，即LRS。如果需要设置数据容灾类型为同城冗余存储，请替换为ZRS。
  //     }
  //     const result = await this.client.putBucket('test');
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
