import { Router } from 'express'
import { addExercise, deleteExercise, findExercise, getExercise, getExerciseMW, updateExercise } from './exercise.controller'

export const exerciseRouter = Router()

exerciseRouter.get('/:id', getExerciseMW, getExercise)
exerciseRouter.get('/', findExercise)

exerciseRouter.post('/', addExercise)
exerciseRouter.delete('/:id', getExerciseMW, deleteExercise)
exerciseRouter.put('/:id', getExerciseMW, updateExercise)
