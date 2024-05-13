import { registerAs } from '@nestjs/config'

export default registerAs('email', () => ({
  resendApiKey: process.env.EMAIL_RESEND_API_KEY,
  smtp: {
    host: process.env.EMAIL_SMTP_HOST,
    port: Number.parseInt(process.env.EMAIL_SMTP_PORT, 10),
    secure: true,
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PSWD,
    },
  },
}))
