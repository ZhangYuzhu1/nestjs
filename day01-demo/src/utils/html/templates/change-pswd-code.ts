import footer from '../blocks/footer'
import { HtmlTag } from '..'
import { header } from '../blocks/header'
import { getVerifyCode, getVerifyCodeDesc } from '../blocks/verify-code'

/**
 * 更改密码的验证码
 * @param code
 */
export function getChangePswdCodeHTML(code: string, title: string) {
  const p1 = HtmlTag.create('p').text(`我们已收到您关于重设${title}帐号密码的请求。您的验证码为：`).indent()
  const subject = `【验证码】更改${title}帐号密码`

  const html = HtmlTag.create('div')
    .appendChild(header())
    .appendChild(p1)
    .appendChild(getVerifyCode(code).style({ margin: '20px 0' }))
    .appendChild(getVerifyCodeDesc())
    .appendChild(footer)
    .raw()
  return { subject, html }
}
