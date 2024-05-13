import type { User } from 'src/entities/user'

import footer from '../blocks/footer'
import { HtmlTag } from '..'
import { DANGER } from '../assets/color'
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

function contentGetter(user: User, arr: string[][]) {
  return [
    HtmlTag
      .create('div')
      .indent()
      .appendChild(
        HtmlTag.create('span').text('您好！管理员已修改了您的账号【'),
        HtmlTag.create('span').text(user.account).color(DANGER).bold(500),
        HtmlTag.create('span').text('】信息，详情如下：'),
      ),
    ...arr.map(([label, value]) => importantInfo(label, value || '<空>')),
    HtmlTag
      .create('div')
      .indent()
      .appendChild(
        HtmlTag.create('span').text('请在'),
        HtmlTag.create('span').text('【用户中心/我的认证】').color(DANGER).style({ fontWeight: '500' }),
        HtmlTag.create('span').text('中查看详情信息。'),
      ),
  ]
}

const desc = HtmlTag
  .create('div')
  .indent()
  .text('这是一封系统邮件，请勿直接回复！如有其他疑问，可微信扫码联系客服！')

/**
 * 用户信息更新
 */
export function getUserUpdateHTML(user: User, arr: string[][], title: string) {
  const subject = `【用户通知】${title}用户信息更新通知`

  const html = HtmlTag
    .create('div')
    .appendChild(
      header(),
      ...contentGetter(user, arr),
      desc,
      footer,
    )
    .raw()
  return { subject, html }
}
