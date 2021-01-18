import { Request, Response } from 'express'
import User from '../../models/user'

export const register = async (req: Request, res: Response) => {
  const user: any = new User()

  user.username = req.body.username
  user.name = req.body.name

  user.setPassword(req.body.password)

  user.save(() => {
    const token = user.generateJwt()
    res.status(200).json({ token })
  })
}
