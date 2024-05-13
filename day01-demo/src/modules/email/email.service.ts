import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { CodeService } from '../code/code.service'
import { SendEmailCodeBodyDto } from './dto/send-email-code.body.dto'
import { CodeAction } from 'src/types/enum/code-action.enum'
import { getRegisterCodeHTML } from 'src/utils/html/templates/register-code'
import { getChangePswdCodeHTML } from 'src/utils/html/templates/change-pswd-code'
import { getLoginCodeHTML } from 'src/utils/html/templates/login-code'

@Injectable()
export class EmailService {
  readonly transporter: nodemailer.Transporter
  private readonly _mailCfg: any
  /** 发送邮件的时间间隔 */
  private readonly _interval: number
  /** 最后一次发送邮件的时间戳 */
  private _lastTime = 0

  constructor(
    private readonly _cfgSrv: ConfigService,
    private readonly _codeSrv: CodeService,
  ) {
    this._mailCfg = _cfgSrv.get('email.smtp')

    this.transporter = nodemailer.createTransport(this._mailCfg)
  }

  getClient() {
    return this.transporter
  }

  /**
 * 发送邮件
 * @param mailOptions
 * @returns
 */
  send(mailOptions: nodemailer.SendMailOptions) {
    const nowTime = Date.now()
    const time = nowTime - this._lastTime >= this._interval ? nowTime : this._lastTime + this._interval
    this._lastTime = time

    setTimeout(() => {
      try {
        this.transporter.sendMail({
          ...mailOptions,
          from: `系统通知 <${this._mailCfg?.auth?.user}>`,
        })
      }
      catch (e) {
        console.error(e)
      }
    }, time - nowTime)
  }

  /**
   * 发送验证码
   * @param body
   * @returns
   */
  public async sendCode(body: SendEmailCodeBodyDto) {
    const expInMin = 5
    const { action, email } = body
    const { code, bizId } = await this._codeSrv.createCode(email, action, expInMin)
    const title = this._cfgSrv.get('EMAIL_TITLE')

    let html, subject
    if (action === CodeAction.REGISTER) {
      const res = getRegisterCodeHTML(code, title)
      html = res.html
      subject = res.subject
    }
    else if (action === CodeAction.CHANGE_PASSWORD) {
      const res = getChangePswdCodeHTML(code, title)
      html = res.html
      subject = res.subject
    }
    else if (action === CodeAction.LOGIN) {
      const res = getLoginCodeHTML(code, title)
      html = res.html
      subject = res.subject
    }
    else {
      subject = `SUST ${action}`
      html = `<p>Your code for ${action} is: <strong>${code}</strong>, expire in ${expInMin} minutes</p>`
    }
    this.send({
      to: email,
      subject,
      html,
    })
    return { bizId }
  }
}
