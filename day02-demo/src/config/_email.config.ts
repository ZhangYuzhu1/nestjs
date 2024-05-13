import { registerAs } from '@nestjs/config'

export default registerAs('email', () => {
  return {
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: '1580006194@qq.com',
      pass: 'gmqsbqbrncwygecc',
    },
  }
})
