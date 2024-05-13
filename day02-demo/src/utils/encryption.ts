import * as crypto from 'node:crypto'

export function addSlat() {
  return crypto.randomBytes(3).toString('base64')
}

export function encryption(userPassword: string, salt: string): string {
  return crypto.pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256').toString('base64')
}
