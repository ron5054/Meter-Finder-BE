import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { userService } from '../user/user.service.js'

export const authService = {
  signup,
  login,
}

async function login(username, password) {
  const user = await userService.getByUsername(username)
  console.log('🚀 ~ login ~ user:', user)
  if (!user) return Promise.reject('Invalid username or password')

  const match = await bcrypt.compare(password, user.password)
  console.log('🚀 ~ login ~ match:', match)
  if (!match) return Promise.reject('Invalid username or password')

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '365d' }
  )
  console.log('🚀 ~ login ~ token:', token)

  delete user.password
  return { user, token }
}

async function signup({ username, password }) {
  const saltRounds = 10

  if (!username || !password)
    return Promise.reject('Missing required signup information')

  const hash = await bcrypt.hash(password, saltRounds)

  await userService.add({
    username,
    password: hash,
  })
}

await signup({ username: 'eyallevy', password: '0528557640' })
