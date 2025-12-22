import crypto from 'node:crypto'

export const generateRandomEmail = () => {
  const randomString = crypto.randomBytes(8).toString('hex')

  const domains = ['@gmail.com', '@test.com', '@ilia.digital']
  const randomDomain = domains[Math.floor(Math.random() * domains.length)]

  return `user_${randomString}${randomDomain}`
}
