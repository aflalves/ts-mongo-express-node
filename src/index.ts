import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { exerciseRouter } from './api/exercise'
import { muscleRouter } from './api/muscle'
import { MONGODB_URI, PORT } from './config/database'
import './config/passport'

mongoose.set('useCreateIndex', true) // stops annoying warning
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

mongoose.connection.once('open', () => {
  const app = express()

  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.options('*', cors())
  app.use(cors())

  // Authentication stuff
  // app.use(passport.initialize())
  // app.use(passport.session())
  // app.use(
  //   jwt({ secret: APP_SECRET, algorithms: ['HS256'] }).unless({
  //     path: ['/user/login', '/user/register'],
  //   })
  // )
  // app.use('/user', userRouter)
  // app.use((err: any, req: any, res: any) => {
  //   if (err.name === 'UnauthorizedError') {
  //     res.status(401).send('invalid token...')
  //   }
  // })

  app.use('/muscles', muscleRouter)
  app.use('/exercises', exerciseRouter)

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})
