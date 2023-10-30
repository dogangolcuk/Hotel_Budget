import crypto from 'crypto-js'

const passwordHash = (plainPassword) => {
  const hashedPassword = crypto.SHA256(plainPassword).toString()
  return hashedPassword
}

const comparePassword = (plainPassword, storedPassword) => {
  const compared = passwordHash(plainPassword) === storedPassword
  return compared
}

export { passwordHash, comparePassword }
