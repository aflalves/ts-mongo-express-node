import { Router } from 'express'
import { addMuscle, deleteMuscle, findMuscle, getMuscle, getMuscleMW } from './muscle.controller'

export const muscleRouter = Router()

muscleRouter.get('/:id', getMuscleMW, getMuscle)
muscleRouter.get('/', findMuscle)

muscleRouter.post('/', addMuscle)
muscleRouter.delete('/:id', getMuscleMW, deleteMuscle)
