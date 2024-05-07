import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function requireAuth(req, res, next) {
  const cookieHeader = req.headers.cookie

  if (!cookieHeader)
    return res.status(401).json({ message: 'Authorization cookie missing' })

  const tokenCookie = cookieHeader
    .split(';')
    .find((cookie) => cookie.trim().startsWith('token='))

  if (!tokenCookie) {
    return res.status(401).json({ message: 'Authorization token missing' })
  }

  const token = tokenCookie.split('=')[1]

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' })
    }
    req.user = decoded
    next()
  })
}
