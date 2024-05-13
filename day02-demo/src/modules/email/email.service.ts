import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter
  private readonly _mailCfg: any

  constructor(
    private readonly _cfgSrv: ConfigService,
  ) {
    this._mailCfg = _cfgSrv.get('email')

    this.transporter = nodemailer.createTransport(this._mailCfg)
  }

  public sendEmail(mailOptions: nodemailer.SendMailOptions) {
    this.transporter.sendMail({
      ...mailOptions,
      from: '"Hello World" 1580006194@qq.com',
    })
  }
}
