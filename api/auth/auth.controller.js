import { authService } from './auth.service.js'

export async function login(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send('Username and password are required')
  }

  try {
    const { user, token } = await authService.login(username, password)
    if (!user) return res.status(401).send('Invalid username or password')

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 365,
      sameSite: 'strict',
    })

    res.json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Failed to process login')
  }
}

export async function logout(req, res) {
  try {
  } catch (err) {
    res.status(400).send({ err: 'Failed to logout' })
  }
}
