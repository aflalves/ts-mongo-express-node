import passport from 'passport'
import passportLocal from 'passport-local'
import User from '../models/user'

const LocalStrategy = passportLocal.Strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
    },
    (username: string, password: string, done) => {
      User.findOne({ username }, (err: any, user: any) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, {
            message: 'User not found',
          })
        }

        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Wrong password',
          })
        }

        // If credentials are correct, return the user object
        return done(null, user)
      })
    }
  )
)
