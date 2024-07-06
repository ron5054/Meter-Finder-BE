import { userService } from './user.service.js'

export async function getUser(req, res) {
  try {
    const user = await userService.getById(req.user.id)
    res.json(user)
  } catch (err) {
    res.status(400).send({ err: 'Failed to get user' })
  }
}

export async function updateUser(req, res) {
  try {
    const updatedUser = req.body
    const user = await userService.update(updatedUser)

    if (user) return res.json(user)
    else throw new Error('Failed to update user')
  } catch (err) {
    res.status(400).send({ err: 'Failed to update user' })
  }
}
