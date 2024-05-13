import type { User } from 'src/entities/user'

import footer from '../blocks/footer'
import { HtmlTag } from '..'
import { DANGER, PRIMARY } from '../assets/color'
import { header } from '../blocks/header'

function importantInfo(key: string, value: string) {
  return HtmlTag
    .create('div')
    .indent()
    .appendChild(
      HtmlTag.create('span').text(`${key}：`).style({ fontWeight: '500' }),
      HtmlTag.create('span').text(`${value}`).style({
        background: DANGER,
        padding: '2px 4px',
        borderRadius: '4px',
        fontWeight: '500',
        color: '#fff',
      }),
    )
}

function contentGetter(user: User, url: string, arr: string[][]) {
  return [
    HtmlTag
      .create('div')
      .indent()
      .appendChild(
        HtmlTag.create('span').text('您好！您的账号【'),
        HtmlTag.create('span').text(user.account).color(DANGER).bold(500),
        HtmlTag.create('span').text('】已经注册，账号信息如下：'),
      ),
    ...arr.map(([label, value]) => importantInfo(label, value || '<空>')),
    HtmlTag
      .create('div')
      .indent()
      .appendChild(
        HtmlTag.create('span').text('登录后建议您'),
        HtmlTag
          .create('a')
          .attr('href', url)
          .style({ color: PRIMARY })
          .text('重置密码'),
        HtmlTag.create('span').text('（在登录页面点击'),
        HtmlTag.create('span').text('【忘记密码】').color(DANGER).bold(500),
        HtmlTag.create('span').text('进行重置）！'),
      ),
  ]
}

const desc = HtmlTag
  .create('div')
  .indent()
  .text('这是一封系统邮件，请勿直接回复！如有其他疑问，可微信扫码联系客服！')

/**
 * 创建新的用户
 */
export function getNewUserHTML(user: User, url: string, arr: string[][], title: string) {
  const subject = `【用户通知】${title}创建用户通知`

  const html = HtmlTag
    .create('div')
    .appendChild(
      header(),
      ...contentGetter(user, url, arr),
      desc,
      footer,
    )
    .raw()
  return { subject, html }
}
