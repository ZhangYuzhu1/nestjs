import footer from '../blocks/footer'
import { HtmlTag } from '..'
import { header } from '../blocks/header'
import { getVerifyCode, getVerifyCodeDesc } from '../blocks/verify-code'

/**
 * 登录的验证码
 * @param code
 */
export function getLoginCodeHTML(code: string, title: string) {
  const p1 = HtmlTag.create('p').text(`我们已收到您关于登录${title}的请求。您的验证码为：`).indent()
  const subject = `【验证码】登录${title}`

  const html = HtmlTag.create('div')
    .appendChild(header())
    .appendChild(p1)
    .appendChild(getVerifyCode(code).style({ margin: '20px 0' }))
    .appendChild(getVerifyCodeDesc())
    .appendChild(footer)
    .raw()
  return { subject, html }
}
