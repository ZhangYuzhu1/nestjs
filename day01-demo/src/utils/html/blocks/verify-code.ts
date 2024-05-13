import { HtmlTag } from '..'
import { DANGER, PRIMARY } from '../assets/color'

export function getVerifyCode(content: string) {
  return HtmlTag
    .create('div')
    .style({
      fontSize: '2rem',
      color: PRIMARY,
      fontWeight: 'bold',
      padding: '5px 10px',
      background: '#f5f5f5',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    })
    .text(content)
}

export function getVerifyCodeDesc() {
  return HtmlTag.create('div').appendChild(
    HtmlTag.create('p').text('温馨提示'),
    HtmlTag.create('ol')
      .appendChild(
        HtmlTag.create('li').appendChild(
          HtmlTag.create('span').text('如果您并未请求此验证码，则可能是他人正在尝试修改您的帐号所绑邮箱地址。'),
          HtmlTag.create('span').text('请勿将此验证码转发给或提供给任何人。').color(DANGER),
        ),
        HtmlTag.create('li').text('如果验证码失效，请登录页面到个人账户重新获取。'),
        HtmlTag.create('li').text('如果不是您本人操作，请忽略此邮件。'),
        HtmlTag.create('li').text('这是一封系统邮件，请勿直接回复。'),
      ),
  )
}
