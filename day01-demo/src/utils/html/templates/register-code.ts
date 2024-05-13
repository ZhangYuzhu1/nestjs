import footer from '../blocks/footer'
import { HtmlTag } from '..'
import { header } from '../blocks/header'
import { getVerifyCode, getVerifyCodeDesc } from '../blocks/verify-code'

const p1 = HtmlTag.create('p').text('我们已收到您邮箱验证的请求。您的注册验证码为：').indent()

/**
 * 注册的验证码
 * @param code
 */
export function getRegisterCodeHTML(code: string, title: string) {
  const subject = `【验证码】${title}用户注册`

  const html = HtmlTag.create('div')
    .appendChild(header())
    .appendChild(p1)
    .appendChild(getVerifyCode(code).style({ margin: '20px 0' }))
    .appendChild(getVerifyCodeDesc())
    .appendChild(footer)
    .raw()
  return { subject, html }
}
