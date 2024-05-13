import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => {
  return {
    loginAuthSecret: 'dshdjhsaiudhkjawhodhakhdohwahdiusgfhslkhfioe',
    loginAuthExpireInSeconds: 28000,
  }
})
