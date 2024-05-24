import { userService } from './user.service.js'

export async function getUser(req, res) {
  try {
    const user = await userService.getById(req.user.id)
    res.json(user)
  } catch (err) {
    res.status(400).send({ err: 'Failed to get user' })
  }
}
