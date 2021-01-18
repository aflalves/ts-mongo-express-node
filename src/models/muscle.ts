import mongoose from 'mongoose'

const muscleSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
})

const Muscle = mongoose.model('Muscle', muscleSchema)
export default Muscle
