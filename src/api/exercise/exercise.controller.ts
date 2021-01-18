import { NextFunction, Request, Response } from 'express'
import Exercise from '../../models/exercise'

export const findExercise = async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find()
    res.json(exercises)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getExercise = async (req: any, res: Response) => {
  res.send(req.exercise)
}

export const addExercise = async (req: Request, res: Response) => {
  const newExercise = new Exercise(req.body)
  try {
    const exercise = await newExercise.save()
    res.status(201).json(exercise)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const updateExercise = async (req: Request, res: any) => {
  try {
    await res.exercise.update(req.body)
    res.json(req.body)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteExercise = async (req: any, res: any) => {
  try {
    await res.exercise.deleteOne()
    res.json({ message: 'Exercise deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getExerciseMW(req: Request, res: any, next: NextFunction) {
  let exercise
  try {
    exercise = await Exercise.findById(req.params.id)
    if (exercise === null) {
      return res.status(404).json({ message: 'Cannot find Exercise' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.exercise = exercise
  next()
}
