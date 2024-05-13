import { HtmlTag } from '..'
import { PRIMARY } from '../assets/color'
import { WECHAT_QRCODE } from '../assets/qrcode'

const footer = HtmlTag
  .create('footer')
  .style({
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.85rem',
    textAlign: 'center',
  })

const qrCode = HtmlTag
  .create('img')
  .attr('src', WECHAT_QRCODE)
  .style({
    width: '200px',
    height: 'auto',
    maxWidth: '80%',
  })

const p1 = HtmlTag
  .create('div')
  .indent()

const span1 = HtmlTag
  .create('span')
  .text('本次服务由')

const a = HtmlTag
  .create('a')
  .attr('href', 'https://www.qiyandata.com/home')
  .style({ color: PRIMARY })
  .text('企研数据科技（杭州）有限公司')

const span2 = HtmlTag
  .create('span')
  .text('提供支持！感谢您的信任！')

p1.appendChild(span1, a, span2)

const p2 = HtmlTag
  .create('div')
  .text('祝工作顺利，生活愉快！')
  .indent()

footer.appendChild(qrCode, p1, p2)

export default footer
