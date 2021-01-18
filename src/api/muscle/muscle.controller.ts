import { NextFunction, Request, Response } from 'express'
import Muscle from '../../models/muscle'

export const findMuscle = async (req: Request, res: Response) => {
  try {
    const users = await Muscle.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMuscle = async (req: any, res: Response) => {
  res.send(req.muscle)
}

export const addMuscle = async (req: Request, res: Response) => {
  const newMuscle = new Muscle(req.body)
  try {
    const muscle = await newMuscle.save()
    res.status(201).json(muscle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteMuscle = async (req: any, res: any) => {
  try {
    await res.muscle.deleteOne()
    res.json({ message: 'Muscle deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getMuscleMW(req: Request, res: any, next: NextFunction) {
  let muscle
  try {
    muscle = await Muscle.findById(req.params.id)
    if (muscle === null) {
      return res.status(404).json({ message: 'Cannot find Muscle' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.muscle = muscle
  next()
}
