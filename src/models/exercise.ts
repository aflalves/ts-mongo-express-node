import mongoose, { Schema } from 'mongoose'

const exerciseSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  level: {
    required: true,
    type: Number,
    min: 0,
    max: 5,
  },
  muscles: [{ type: Schema.Types.ObjectId, ref: 'Muscle' }],
})

const Exercise = mongoose.model('Exercise', exerciseSchema)
export default Exercise
