import { Request, Response } from 'express'
import passport from 'passport'

export const login = async (req: Request, res: Response, next: any) => {
  passport.authenticate('local', (error, user: any, info) => {
    if (error) {
      res.status(404).json(error)
    }

    if (user) {
      const token = user.generateJwt()
      res.status(200).json({ token })
    } else {
      res.status(401).json(info)
    }
  })(req, res, next)
}
